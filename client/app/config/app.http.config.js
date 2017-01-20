'use strict';

angular.module('fioletoweApp')
    .config(function ($compileProvider, $httpProvider) {
        $httpProvider.interceptors.push('JWThttpRequestInterceptor');
        $httpProvider.interceptors.push('ApiRequestInterceptor');
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|chrome-extension):/);
    });
