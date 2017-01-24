'use strict';

angular
    .module('users.signup')
    .component('signup', {
        templateUrl: 'users/signup/signup.html',
        css: 'users/users.css',
        controller: function SignupController(AuthService, $timeout, $scope, $location) {
            this.reg = () => {
                if (!$scope.signupform.$invalid) {
                    AuthService.signup(this.user, this.mail, this.pass)
                        .then(response => {
                            console.log(response);
                            $location.path('/login');
                        }, error => {
                            this.error = error.data.msg;
                        });
                }
            }
        }
    });
