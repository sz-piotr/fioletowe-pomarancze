'use strict';


angular
    .module('main.shareBrowser')
    .factory('ShareService', function ShareService($q, $http) {
        function findByName(array, name) {
            for (var element of array) {
                if (element.name === name) {
                    return element;
                }
            }
        }

        return {
            query() {
                return $q(function (resolve, reject) {
                    $http.get('main/share-browser/fake-devices.json')
                        .then(response => {
                            var devices = response.data.devices;
                            devices.forEach(x => x.shares = []);
                            $http.get('main/share-browser/fake-shares.json')
                                .then(response => {
                                    var shares = response.data.shares;
                                    shares.forEach(share => findByName(devices, share.device).shares.push(share));
                                    resolve(devices);
                                }, error => reject(error));
                        }, error => reject(error));
                });
            }
        }
    });
