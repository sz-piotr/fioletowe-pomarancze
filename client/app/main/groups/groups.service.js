'use strict';

angular
    .module('main.groups')
    .factory('GroupsService', function GroupsService($q, $http) {
        return {
            query() {
                return $http.get('main/groups/fake-data.json');
            },
            addGroup(group) {
                return $q(function(resolve, reject) {
                    reject("NOT IMPLEMENTED");
                });
            },
            removeGroup(group) {
                return $q(function(resolve, reject) {
                    reject("NOT IMPLEMENTED");
                });
            },
            addShare(share, group) {
                return $q(function(resolve, reject) {
                    reject("NOT IMPLEMENTED");
                });
            },
            removeShare(share, group) {
                return $q(function(resolve, reject) {
                    reject("NOT IMPLEMENTED");
                });
            },
            addMember(member, group) {
                return $q(function(resolve, reject) {
                    reject("NOT IMPLEMENTED");
                });
            },
            removeMember(member, group) {
                return $q(function(resolve, reject) {
                    reject("NOT IMPLEMENTED");
                });
            }
        }
    });
