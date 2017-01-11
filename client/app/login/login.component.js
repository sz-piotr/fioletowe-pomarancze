'use strict';

angular
    .module('login')
    .component('login', {
        templateUrl: 'login/login.html',
        css: 'login/login.css',
        controller: function LoginController() {
            this.login = (user, password) => {
                console.log(user, password);
            };
        }
    });
