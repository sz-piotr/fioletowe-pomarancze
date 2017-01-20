'use strict';

angular.module('fioletoweApp')
    .factory('ApiRequestInterceptor', function ApiRequestInterceptor() {
        return {
            request: function (config) {
                if (config.url.startsWith('/api'))
                    config.url = `${global.cfg.server}${config.url}`
                return config;
            }
        }
    })
