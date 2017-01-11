'use strict';

angular
    .module('login')
    .component('login', {
        templateUrl: 'users/login/login.html',
        css: 'users/users.css',
        controller: function LoginController($scope, $timeout, $location) {
            this.login = () => {
                if (!$scope.loginform.$invalid) {
                    if($scope.user.name === 'admin' && $scope.user.password === 'admin') {
                        $location.path('main');
                    } else {
                        this.error = true;
                        $timeout(this.reset);
                    }
                }
            };

            this.reset = () => {
                $scope.user = {};
                $scope.loginform.$setPristine();
                $scope.loginform.$setUntouched();
            }
        }
    });
