'use strict';

angular
    .module('main.groups')
    .factory('GroupsService', function GroupsService($q, $http) {
        return {
            query() {
                return $http.get('main/groups/fake-data.json');
            }
        }
    });
