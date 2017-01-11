'use strict';

angular
    .module('login')
    .component('login', {
        templateUrl: 'users/login/login.html',
        css: 'users/users.css',
        controller: function LoginController() {
            this.login = (user, password) => {
                console.log(user, password);
            };
        }
    });
