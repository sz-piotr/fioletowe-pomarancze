'use strict';

angular
    .module('main.groups')
    .factory('GroupsService', function GroupsService($q, $http) {
        return {
            query() {
                return $http.get('/api/groups');
            },
            addGroup(group) {
                group = encodeURIComponent(group);
                return $http.post('/api/groups/' + group)
                    .then(
                        result => result,
                        error => $q.reject(error.data.msg)
                    );
            },
            removeGroup(group) {
                group = encodeURIComponent(group);
                return $http.delete('/api/groups/' + group)
                    .then(
                        result => result,
                        error => $q.reject(error.data.msg)
                    );
            },
            addShare(share, group) {
                console.log(share, group);
                share = encodeURIComponent(share);
                group = encodeURIComponent(group);
                return $http.post('/api/groups/' + group + '/shares/' + share)
                    .then(
                        result => result,
                        error => $q.reject(error.data.msg)
                    );
            },
            removeShare(share, group) {
                share = encodeURIComponent(share);
                group = encodeURIComponent(group);
                return $http.delete('/api/groups/' + group + '/shares/' + share)
                    .then(
                        result => result,
                        error => $q.reject(error.data.msg)
                    );
            },
            addMember(member, group) {
                member = encodeURIComponent(member);
                group = encodeURIComponent(group);
                return $http.post('/api/groups/' + group + '/members/' + member)
                    .then(
                        result => result,
                        error => $q.reject(error.data.msg)
                    );
            },
            removeMember(member, group) {
                member = encodeURIComponent(member);
                group = encodeURIComponent(group);
                return $http.delete('/api/groups/' + group + '/members/' + member)
                    .then(
                        result => result,
                        error => $q.reject(error.data.msg)
                    );
            }
        }
    });
