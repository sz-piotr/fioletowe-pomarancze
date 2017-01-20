'use strict';

angular.module('fioletoweApp')
    .config(function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.when('', '/login');
        $urlRouterProvider.when('/', '/login');
        $urlRouterProvider.when('/main', '/main/remote');
        $stateProvider
            .state('login', {
                url: '/login',
                component: 'login'
            })
            .state('signup', {
                url: '/signup',
                component: 'signup'
            })
            .state('main', {
                url: '/main',
                component: 'main'
            })
            .state('main.userbrowser', {
                url: '/userbrowser',
                component: 'userBrowser'
            })
            .state('main.options', {
                url: '/options',
                component: 'options'
            })
            .state('main.remote', {
                url: '/remote',
                component: 'remoteBrowser'
            });
    });
