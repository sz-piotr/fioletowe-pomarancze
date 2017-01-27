'use strict';

angular.module('fioletoweApp')
    .config(function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.when('', '/login');
        $urlRouterProvider.when('/', '/login');
        $urlRouterProvider.when('/main', '/main/groups');
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
            .state('main.shares', {
                url: '/shares',
                component: 'shares'
            })
            .state('main.remotes', {
                url: '/remotes',
                component: 'remotes'
            })
            .state('main.groups', {
                url: '/groups',
                component: 'groups'
            });
    });
