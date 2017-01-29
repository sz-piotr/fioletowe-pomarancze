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
        var jwt = localStorage.jwt,
            url = url.parse(global.cfg.server),
            postOptions = {
                host:url.host.replace(/:[0-9]*$/,''),
                port:url.port,
                path:url.pathname,
                method:'POST',
                headers: {
                    'Authorization':`Bearer ${jwt}`,
                    'Content-Type':'application/json'
                }
            };
        return new Promise(function (resolve, reject) {
            if (!jwt) reject({code:500, message:"Not logged in. Local server inactive"});
            var req = http.request(postOptions, function(res){
                var res='';
                res.on('data', (d) => {res+=d});
                res.on('end',() => {
                    var j;
                    try { j = JSON.parse(res); } 
                    catch (e) { reject(e); }
                    resolve({
                        allowed: j.allowed,
                        //realpath: process.platform === 'win32' ? path.join('C:', url) : url
                        realpath: j.realpath
                    });
                });
                res.on('error', (err) => reject(err));
            });
            req.write(JSON.stringify({
                issuer:{token:token},
                request:{share:url.split('/')[0],path:url.split('/')[1]}
            }));
            req.end();
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
            if (!localStorage.jwt)
                console.warn("Server inactive. Waiting for login");
        }
    }
})();

global.fileServer = new FileServer();
global.fileServer.run();
