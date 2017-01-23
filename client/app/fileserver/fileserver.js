'use strict'

var FileServer = (function () {
    var fs = require('fs'),
        http = require('http'),
        path = require('path'),
        url = require('url'),
        args = require('minimist')(require('nw.gui').App.argv, {
            number: ['port'],
            string: ['addr'],
            alias: {
                port: ['p'],
                addr: ['a']
            },
            default: {
                port: 8111,
                addr: '0.0.0.0'
            }
        });

    function verifyAccessToken(token, url, callback) {
        var jwt = localStorage.jwt;
        // TODO real request to server
        return new Promise(function (resolve, reject) {
            resolve({
                allowed: true,
                realpath: process.platform === 'win32' ? path.join('C:', url) : url
            });
        });
    }

    function processRequest(req) {
        return new Promise(function (resolve, reject) {
            var parsedUrl = url.parse(req.url, true);
            if (/^AccessToken .+$/.test(req.headers['authorization'])) {
                var accessToken = req.headers['authorization'].substring(11);
            } else if (parsedUrl.query['at'] !== undefined) {
                var accessToken = parsedUrl.query['at'];
            } else {
                reject({
                    code: 403,
                    message: 'AccessToken is missing'
                });
            }
            verifyAccessToken(accessToken, parsedUrl.pathname)
                .then(
                    response => {
                        if (response.allowed) {
                            resolve(response.realpath);
                        } else {
                            reject({
                                code: 403,
                                message: 'AccessToken is invalid'
                            });
                        }
                    },
                    error => reject({
                        code: 403,
                        message: 'forbidden'
                    })
                );
        });
    }

    function directoryContents(directory) {
        var contents = {
            files: [],
            folders: []
        };
        fs.readdirSync(directory).forEach(function (x) {
            try {
                if (fs.statSync(path.join(directory, x)).isDirectory()) {
                    contents.folders.push(x);
                } else {
                    contents.files.push(x);
                }
            } catch (e) {}
        });
        return contents;
    }

    return class FileServer {
        constructor() {
            this.server = http.createServer(this.reqHandler.bind(this));
        }

        reqHandler(req, res) {
            processRequest(req)
                .then(realpath => {
                    try {
                        var stat = fs.statSync(realpath);
                        if (stat.isDirectory()) {
                            var data = directoryContents(realpath);
                            res.statusCode = 200;
                            res.end(JSON.stringify(data), 'utf-8');
                        } else {
                            res.writeHead(200, {
                                'Content-Type': 'application/octet-stream',
                                'Content-Length': stat.size,
                                'Content-Disposition': 'attachment; filename="' + path.basename(realpath) + '"'
                            });
                            var stream = fs.createReadStream(realpath);
                            stream.pipe(res);
                        }
                    } catch (e) {
                        console.error(e);
                        res.statusCode = 404;
                        res.end();
                    }
                }, error => {
                    console.error(error);
                    res.statusCode = error.code;
                    res.end(error.message, 'utf-8');
                });
        }

        run() {
            this.server.listen(args.port, args.addr);
            console.log('Server started on addr: ', args.addr, ' on port: ', args.port);
        }
    }
})();

global.fileServer = new FileServer();
global.fileServer.run();
