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

    function verifyAccessToken(token, path, callback) {
        return new Promise(function (resolve, reject) {
            if (!localStorage.jwt) reject({
                code: 500,
                message: "Not logged in. Local server inactive"
            });
            console.log("PATH", path);
            $.ajax({
                url: `${global.cfg.server}/api/shares/public/verify/at`,
                headers: {
                    'Authorization': `Bearer ${localStorage.jwt}`
                },
                method: 'POST',
                data: JSON.stringify({
                    issuer: {
                        token: token
                    },
                    request: {
                        share: path.split('/')[1],
                        path: path.split('/')[2]
                    }
                })
            }).done(function (data) {
                resolve(data);
            }).fail(function (error) {
                console.log(error);
                reject(error);
            });
        });
    }

    function processRequest(req) {
        return new Promise(function (resolve, reject) {
            var parsedUrl = url.parse(req.url, true);
            if (/^AccessToken .+$/.test(req.headers['authorization'])) {
                var accessToken = req.headers['authorization'].substring(12);
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
                    error => {
                        reject({
                            code: 403,
                            message: 'forbidden'
                        })
                        console.error(error);
                    }
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
            if (!localStorage.jwt)
                console.warn("Server inactive. Waiting for login");
        }
    }
})();

global.fileServer = new FileServer();
global.fileServer.run();
