'use strict';

angular.module('phonecatApp')
    .config(function($compileProvider, $routeProvider) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|ftp|file|blob|chrome-extension):|data:image\/)/);
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|chrome-extension):/);

        $routeProvider
            .when('/phones', {
                template: '<phone-list></phone-list>'
            })
            .when('/phones/:phoneId', {
                template: '<phone-detail></phone-detail>'
            })
            .otherwise('/phones');
    });
