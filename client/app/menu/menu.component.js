'use strict';

angular
    .module('menu')
    .component('rootMenu', {
        templateUrl: 'menu/menu.html',
        css: 'menu/menu.css',
        controller: function MenuController($scope, $timeout, $location) {
            this.go = (route) => {
                $location.path(route);
            }
        }
    });
