'use strict';

angular.module('fioletoweApp')
    .config(function($compileProvider, $routeProvider) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|chrome-extension):/);

        $routeProvider
            .when('/', {
                template: '<fs-browser></fs-browser>'
            })
            .otherwise('/');
    });
