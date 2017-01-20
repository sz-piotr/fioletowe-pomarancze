'use strict';

angular.module('fioletoweApp')
    .config(function ($routeProvider) {
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
