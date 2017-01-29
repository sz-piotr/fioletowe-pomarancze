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
                            localStorage.username = response.data.username;
                            resolve(response.data);
                        }, error => {
                            reject(error);
                        });
                })
            },
            username() {
                return localStorage.username;
            },
            logout() {
                localStorage.removeItem('jwt');
                localStorage.removeItem('username');
            },
            signup(username, email, password) {
                var data = JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                });
                return $http.post('/api/users', data);
            },
            verify() {
                return $q(function (resolve, reject) {
                    $http.get('/api/devices')
                    .then(res => resolve(true), err => reject(false));
                });
            }
        }
    });
