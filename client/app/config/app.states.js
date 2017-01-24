'use strict';

angular.module('fioletoweApp')
    .config(function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.when('', '/login');
        $urlRouterProvider.when('/', '/login');
        $urlRouterProvider.when('/main', '/main/shares');
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
            .state('main.shareBrowser', {
                url: '/shares',
                component: 'shareBrowser'
            })
            .state('main.remote', {
                url: '/remote',
                component: 'remoteBrowser'
            });
    });
