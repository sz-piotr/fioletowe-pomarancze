'use strict';


angular
    .module('main.shares')
    .factory('SharesService', function SharesService($q, $http) {
        function findByName(array, name) {
            for (var element of array) {
                if (element.name === name) {
                    return element;
                }
            }
        }

        function extractError(error){
            if (!(error.data && error.data.msg))
                return error.statusText || 'Unknown error';
            else
                return error.data.msg;
        }

        return {
            query() {
                return $q(function (resolve, reject) {
                    $http.get('/api/devices')
                        .then(response => {
                            console.log(response);
                            var devices = response.data.devices;
                            devices.forEach(x => {
                                x.shares = [];
                            });
                            $http.get('/api/shares')
                                .then(response => {
                                    console.log(response);
                                    var shares = response.data.shares;
                                    shares.forEach(share => {
                                        findByName(devices, share.device).shares.push(share)
                                    });
                                    resolve(devices);
                                }, error => reject(extractError(error)));
                        }, error => {
                            console.error('list',error);
                            reject(extractError(error));
                        });
                });
            },
            deleteDevice(name) {
                name = encodeURIComponent(name);
                return $q(function (resolve, reject) {
                    $http.delete(`/api/devices/${name}`)
                        .then(res => {
                            console.log('ok',name);
                            resolve(res);
                        }, error => {
                            console.error(name,error);
                            reject(extractError(error));
                        });
                });
            },
            deleteShare(name) {
                name = encodeURIComponent(name);
                return $q(function (resolve, reject) {
                    $http.delete(`/api/shares/${name}`)
                        .then(res => {
                            console.log('ok',name);
                            resolve(res);
                        }, error => {
                            console.error(name,error);
                            reject(extractError(error))
                        });
                });
            },
            deletePath(path,share) {
                path = encodeURIComponent(path);
                share = encodeURIComponent(share);
                return $q(function (resolve, reject) {
                    $http.delete(`/api/shares/${share}/paths/${path}`)
                        .then(res => {
                            console.log('ok',share,path);
                            resolve(res);
                        }, error => {
                            console.error(share,path,error);
                            reject(extractError(error));
                        });
                });
            },

            addDevice(name,addr) {
                name = encodeURIComponent(name);
                return $q(function (resolve, reject) {
                    $http.post(`/api/devices/${name}`,{
                        address:addr
                    }).then(res => {
                        console.log('ok',name);
                        resolve(res);
                    }, error => {
                        console.error(name,error);
                        reject(extractError(error));
                    });
                });
            },
            addShare(name,dev) {
                name = encodeURIComponent(name);
                return $q(function (resolve, reject) {
                    $http.post(`/api/shares/${name}`,{
                        device:dev
                    }).then(res => {
                        console.log('ok',name);
                        resolve(res);
                    }, error => {
                        console.error(name,error);
                        reject(extractError(error));
                    });
                });
            },
            addPath(path,share,syspath) {
                path = encodeURIComponent(path);
                share = encodeURIComponent(share);
                return $q(function (resolve,reject) {
                    $http.post(`/api/shares/${share}/paths/${path}`,{
                        path:syspath
                    }).then(res => {
                        console.log('ok',share,path);
                        resolve(res);
                    }, error => {
                        console.error(share,path,error);
                        reject(extractError(error));
                    });
                });
            }
        }
    });
