'use strict';

angular.module('fioletoweApp')
    .factory('JWThttpRequestInterceptor', function JWThttpRequestInterceptor() {
        return {
            request: function (config) {
                var jwt = localStorage['jwt'];
                if (jwt && config.url.startsWith('/api'))
                    config.headers['Authorization'] = 'Bearer ' + jwt;
                return config;
            }
        }
    })
