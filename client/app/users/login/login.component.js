'use strict';

angular
    .module('login')
    .component('login', {
        templateUrl: 'users/login/login.html',
        css: 'users/users.css',
        controller: function LoginController($scope, $timeout, $location) {
            this.login = () => {
                if (!$scope.loginform.$invalid) {
                    console.log($scope.user.name, $scope.user.password);
                    this.error = true;
                    $timeout(function () {
                        $scope.user = {};
                        $scope.loginform.$setPristine();
                        $scope.loginform.$setUntouched();
                    });
                }
            };
        }
    });
