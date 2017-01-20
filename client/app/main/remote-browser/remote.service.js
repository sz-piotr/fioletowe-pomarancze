'use strict';

angular
    .module('main.remoteBrowser')
    .factory('RemoteService', function RemoteService($q, $http) {
        function asQuery(filepath) {
            filepath = filepath.split('/').filter(x => x !== '');
            return {
                user: filepath[0],
                share: filepath[1],
                path: filepath.slice(2).join('/')
            }
        }

        function asTree(shares) {
            let tree = {};
            shares.forEach(share => {
                tree[share.owner] = tree[share.owner] || {};
                tree[share.owner][share.name] = {};
                share.paths.forEach(path => {
                    tree[share.owner][share.name][path.name] = null;
                });
            });
            return {
                tree: tree,
                get(query) {
                    if (query.user === undefined) {
                        return Object.getOwnPropertyNames(this.tree)
                            .map(x => '/' + x)
                            .map(x => new RemoteObject(x, 'USER'));
                    } else if (query.share === undefined) {
                        let path = '/' + query.user;
                        return Object.getOwnPropertyNames(this.tree[query.user])
                            .map(x => path + '/' + x)
                            .map(x => new RemoteObject(x, 'DIRECTORY'));
                    } else {
                        let path = '/' + query.user + '/' + query.share;
                        return Object.getOwnPropertyNames(this.tree[query.user][query.share])
                            .map(x => path + '/' + x)
                            .map(x => new RemoteObject(x, 'DIRECTORY'));
                    }
                }
            };
        }

        class RemoteObject {
            constructor(filepath, type) {
                this.path = filepath;
                filepath = filepath.split('/');
                this.name = filepath[filepath.length - 1];
                this.type = type;
            }

            ancestors() {
                var ancestors = [];
                var current = this.path.replace(/\/$/, "");
                while (true) {
                    var lastSlash = current.lastIndexOf('/');
                    if (lastSlash === -1)
                        break;
                    var parent = current.substring(0, lastSlash);
                    ancestors.push(new RemoteObject(parent));
                    current = parent;
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
                    let query = asQuery(this.path);
                    if (query.path === '') {
                        $http.get('main/remote-browser/fake-data.json')
                            .then(response => {
                                let tree = asTree(response.data.shares);
                                global.tree = tree;
                                resolve(tree.get(query));
                            }, error => reject(error));
                    } else {
                        // TODO ask for user, query that user
                        resolve([]);
                    }
                });
            }
        }

        return {
            get(path) {
                return new RemoteObject(path);
            }
        }
    });
