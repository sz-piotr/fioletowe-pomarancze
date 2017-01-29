'use strict';

angular
    .module('users.login')
    .component('login', {
        templateUrl: 'users/login/login.html',
        css: 'users/users.css',
        controller: function LoginController(AuthService, $scope, $timeout, $location, $http) {
            var self = this;
            this.login = () => {
                if (!$scope.loginform.$invalid) {
                    AuthService.login(this.user, this.pass)
                        .then(response => {
                            $location.path('main');
                        }, error => {
                            self.error = true;
                            $timeout(self.reset);
                        });
                }
            }

            this.reset = () => {
                delete this.email;
                delete this.pass;
                $scope.loginform.$setPristine();
                $scope.loginform.$setUntouched();
            }

            if (localStorage.jwt)
                AuthService.verify()
                .then(res => {
                    $location.path('main');
                }, err => {});
        }
    });
