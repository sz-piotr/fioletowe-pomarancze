'use strict';

angular
    .module('login')
    .component('login', {
        templateUrl: 'users/login/login.html',
        css: 'users/users.css',
        controller: function LoginController($scope, $timeout, $location, $http) {
            var self = this;
            this.login = () => {
                var dat = {
                    username:this.user,
                    password:this.pass
                };
                console.log('asd',dat);
                if (!$scope.loginform.$invalid) {
                    $http.post(`${global.cfg.server}/api/login`,JSON.stringify(dat)).then(function(response){
                        console.log(response);
                        localStorage.jwt=response.data.token;
                        $location.path('menu');
                    }, function(response){
                        console.error(response);
                        self.error=true;
                        $timeout(self.reset);
                    });
                }
            };

            this.reset = () => {
                this.email='';
                this.pass='';
                $scope.loginform.$setPristine();
                $scope.loginform.$setUntouched();
            }
        }
    });
