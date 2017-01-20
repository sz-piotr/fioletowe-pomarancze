
'use strict';

angular
    .module('userBrowser')
    .component('userBrowser', {
        templateUrl: 'main/user-browser/user-browser.html',
        css: 'main/user-browser/user-browser.css',
        controller: function UserBrowserController($http, $location) {
            var self = this;
            this.shares=[];
            $http.get(`${global.cfg.server}/api/shares/public`)
            .then(function(response){
                var knownOwners = [];
                response.data.shares.forEach(s => {
                    if (knownOwners.indexOf(s.owner)==-1){
                        self.shares.push({owner:s.owner, shares:[]});
                        knownOwners.push(s.owner);
                    }
                    var owner = self.shares.filter(ss => ss.owner==s.name)[0];
                    owner.shares.push({
                        name:s.name,
                        paths:s.paths
                    });
                });
            },
            function(response){
                alert('error');
                console.error(response);
            });

            this.open = (owner,share) => {
                $location.open('/shareBrowser/')
            }
        }
    });
