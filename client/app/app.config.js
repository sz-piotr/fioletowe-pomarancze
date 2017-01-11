'use strict';

angular.module('fioletoweApp')
    .config(function($compileProvider, $routeProvider) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|chrome-extension):/);

        $routeProvider
            .when('/login', {
                template: '<login></login>'
            }).when('/signup', {
                template: '<signup></signup>'
            })
            .otherwise('/login');
    });
