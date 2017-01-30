'use strict';

angular
    .module('main.remotes')
    .factory('RemotesService', function RemotesService($q, $http) {
        var tree = {
            children: {}
        };

        var tokens = {};

        function populateTree() {
            return $http.get('main/remotes/fake-data.json')
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
            console.log(token);
            return $http.get(`http://${url}`, {
                headers: {
                    'Authorization': `AccessToken ${token}`
                }
            }).then(
                response => {
                    console.log(response);
                },
                error => $q.reject(error)
            );
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
                                error => reject(error)
                            ),
                            error => reject(error)
                        );
                        resolve([]);
                    }
                });
            }

            _children() {
                return Reflect.ownKeys(this.node.children).map(
                    key => new RemoteObject(this.node.children[key])
                );
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
