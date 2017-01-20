'use strict';

angular.module('fioletoweApp')
    .factory('JWThttpRequestInterceptor', function () {
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
    .factory('ApiRequestInterceptor', function () {
        return {
            request: function (config) {
                if (config.url.startsWith('/api'))
                    config.url = `${global.cfg.server}${config.url}`
                return config;
            }
        }
    })
    .config(function ($compileProvider, $routeProvider, $httpProvider) {
        $httpProvider.interceptors.push('JWThttpRequestInterceptor');
        $httpProvider.interceptors.push('ApiRequestInterceptor');
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|chrome-extension):/);

        $routeProvider
            .when('/login', {
                template: '<login></login>'
            }).when('/signup', {
                template: '<signup></signup>'
            }).when('/main', {
                template: '<fs-browser></fs-browser>'
            }).when('/menu', {
                template: '<root-menu></root-menu>'
            }).when('/userBrowser', {
                template: '<user-browser></user-browser>'
            }).when('/shareBrowser', {
                template: '<share-browser></share-browser>'
            }).when('/options', {
                template: '<options></options>'
            })
            .otherwise('/login');
    });

global.cfg = require('minimist')(require('nw.gui').App.argv, {
    string: ['server'],
    number: ['port'],
    alias: {
        server: ['s'],
        port: ['p']
    },
    default: {
        server: 'http://127.0.0.1:5000',
        port: '8111'
    }
});
