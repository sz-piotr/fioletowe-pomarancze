'use strict';

angular
    .module('users')
    .factory('AuthService', function AuthService($q, $http) {
        return {
            login(username, password) {
                var data = JSON.stringify({
                    username: username,
                    password: password
                });
                return $q(function (resolve, reject) {
                    $http.post('/api/login', data)
                        .then(response => {
                            localStorage.jwt = response.data.token;
                            resolve(response.data);
                        }, error => {
                            reject(error);
                        });
                })
            },
            logout() {
                localStorage.removeItem('jwt');
            },
            signup(username, email, password) {
                var data = JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                });
                return $http.post('/api/users', data);
            }
        }
    });