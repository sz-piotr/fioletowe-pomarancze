'use strict';

angular.module('fioletoweApp')
    .factory('JWThttpRequestInterceptor', function JWThttpRequestInterceptor() {
        return {
            request: function (config) {
                var jwt = localStorage['jwt'];
                if (jwt)
                    config.headers['Authorization'] = 'Bearer ' + jwt;
                else
                    delete config.headers['Authorization'];

                return config;
            }
        }
    })
