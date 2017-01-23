angular
    .module('navbar')
    .component('navbar', {
        templateUrl: 'main/navbar/navbar.html',
        css: 'main/navbar/navbar.css',
        controller: function NavbarController(AuthService, $location) {
            this.username = AuthService.username();
            this.logout = function() {
                AuthService.logout();
                $location.path('/login');
            }
        }
    });
