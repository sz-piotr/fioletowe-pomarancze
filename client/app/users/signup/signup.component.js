'use strict';

angular
    .module('signup')
    .component('signup', {
        templateUrl: 'users/signup/signup.html',
        css: 'users/users.css',
        controller: function SignupController($http, $location) {
            this.reg = () => {
                var dat = {
                    username:this.user,
                    email:this.mail,
                    password:this.pass
                };
                console.log(dat);

                $http.post(`${global.cfg.server}/api/users`, dat
                ).then(function(response){
                    $location.path('/login');
                }, function(response){
                    alert('error');
                    console.error(response);
                });
            }
        }
    });
