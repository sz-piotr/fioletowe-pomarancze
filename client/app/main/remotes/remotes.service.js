'use strict';

angular
    .module('main.remotes')
    .factory('RemotesService', function RemotesService($q, $http) {
        var tree;
        var tokens = {};
        var nfs = require('fs');
        var nhttp = require('http');
        var nurl = require('url');

        function populateTree() {
            tree = {
                children: {}
            };
            return $http.get('/api/shares/public')
                .then(response => {
                    for (let share of response.data.shares) {
                        tree.children[share.owner] = tree.children[share.owner] || {
                            type: "USER",
                            name: share.owner,
                            children: {},
                            parent: tree
                        }
                        let paths = {};
                        let shareNode = tree.children[share.owner].children[share.name] = {};
                        share.paths.forEach(path => paths[path.name] = {
                            type: "DIRECTORY",
                            name: path.name,
                            parent: shareNode
                        });
                        shareNode.type = "DIRECTORY";
                        shareNode.name = share.name;
                        shareNode.children = paths;
                        shareNode.parent = tree.children[share.owner];
                        shareNode.address = share.address;
                    }
                }, error => $q.reject(error));
        }

        function getLocation(remote) {
            let ancestors = remote.ancestors();
            ancestors.push(remote);
            return {
                owner: ancestors[1].node.name,
                share: ancestors[2].node.name,
                path: ancestors[3].node.name,
                address: ancestors[2].node.address
            }
        }

        function getToken(remote) {
            let location = getLocation(remote);
            if (tokens[location.owner] !== undefined) {
                return $q.when(tokens[location.owner]);
            } else {
                let user = encodeURIComponent(location.owner);
                return $http.get(`/api/shares/public/${user}/at`)
                    .then(
                        response => response.data.token,
                        error => $q.reject(error)
                    );
            }
        }

        function buildUrl(remote) {
            let ancestors = remote.ancestors();
            ancestors.push(remote);
            let address = ancestors[2].node.address;
            let url = address;
            for (let ancestor of ancestors.slice(2)) {
                url += '/' + encodeURIComponent(ancestor.node.name);
            }
            return url;
        }

        function populateChildren(remote, token) {
            var url = buildUrl(remote);
            return $http.get(`http://${url}`, {
                headers: {
                    'Authorization': `AccessToken ${token}`
                }
            }).then(
                response => {
                    console.log(response.data);
                    remote.node.children = {};
                    for(let folder of response.data.folders) {
                        remote.node.children[folder] = {
                            parent: remote.node,
                            type: "DIRECTORY",
                            name: folder,
                        }
                    }
                    for(let file of response.data.files) {
                        remote.node.children[file] = {
                            parent: remote.node,
                            type: "FILE",
                            name: file,
                        }
                    }
                    return response;
                },
                error => $q.reject(error)
            );
        }

        function fetchFile(remote, token, stream) {
            var url = buildUrl(remote),
                purl = nurl.parse(`http://${url}`),
                getOptions = {
                    hostname:purl.hostname,
                    port:purl.port,
                    path:purl.path,
                    headers:{
                        'Authorization': `AccessToken ${token}`
                    }
                };
            return $q(function(resolve, reject){
                var getReq = nhttp.get(getOptions,(res) => {
                    if (res.statusCode != 200)
                        return reject(res.statusText);

                    var _bytes=0,
                        _ended=false,
                        _size=res.headers['content-length'],
                        progress = {
                            get bytesReceived(){return _bytes},
                            get ended(){return _ended},
                            get bytesTotal(){return _size},
                            onend:null,
                            onprogress:null
                        };
                    res.on('data',d => {
                        _bytes += d.length;
                        if (typeof progress.onprogress === 'function')
                            progress.onprogress(_bytes);
                    });
                    res.on('end',() => {
                        _ended=true;
                        if (typeof progress.onend === 'function')
                            progress.onend();
                    });
                    res.on('error',err => {
                        _ended=true;
                        if (typeof progress.onerror === 'function')
                            progress.onerror(err);
                    });
                    res.pipe(stream);
                    return resolve(progress);
                });
                getReq.on('error',(err) => reject(err));
                console.log(getOptions);
            });
        }

        class RemoteObject {
            constructor(node) {
                this.node = node;
                if (this.node !== tree) {
                    this.name = this.node.name;
                    this.type = this.node.type;
                }
            }

            ancestors() {
                var ancestors = [];
                var current = this.node;
                while (current.parent) {
                    ancestors.push(new RemoteObject(current.parent));
                    current = current.parent;
                }
                return ancestors.reverse();
            }

            isDirectory() {
                return this.type === 'DIRECTORY';
            }

            isFile() {
                return this.type === 'FILE';
            }

            isUser() {
                return this.type === 'USER';
            }

            download(destination) {
                return $q((resolve, reject) => {
                    console.log('Download to:',destination);
                    if (this.node.type != 'FILE') {
                        reject('This is not a file!');
                    } else {
                        try { //pilot write
                            nfs.writeFileSync(destination,'0');
                            nfs.unlinkSync(destination);
                        } catch (e) {
                            reject('Could not write to destination');
                            return;
                        }
                        let token = getToken(this).then(
                            token => fetchFile(this, token, nfs.createWriteStream(destination)).then(
                                response => resolve(response),
                                error => reject(error.statusText)
                            ),
                            error => reject(error)
                        );
                    }
                });
            }

            children() {
                return $q((resolve, reject) => {
                    if (this.node.type === 'FILE') {
                        reject('This is a file!');
                    } else if (this.node.children !== undefined) {
                        resolve(this._children());
                    } else {
                        let token = getToken(this).then(
                            token => populateChildren(this, token).then(
                                response => resolve(this._children()),
                                error => reject(error.statusText)
                            ),
                            error => reject(error)
                        );
                    }
                });
            }

            _children() {
                console.log(this.node);
                let children = Reflect.ownKeys(this.node.children).map(
                    key => new RemoteObject(this.node.children[key])
                );
                console.log("return", children);
                return children;
            }
        }

        return {
            getRoot() {
                return populateTree()
                    .then(
                        response => new RemoteObject(tree),
                        error => $q.reject(error)
                    );
            }
        }
    });
