angular
    .module('main.groups')
    .component('groups', {
        templateUrl: 'main/groups/groups.html',
        css: 'main/groups/groups.css',
        controller: function GroupsController(GroupsService) {
            GroupsService.query()
                .then(
                    response => this.groups = response.data.groups,
                    error => this.error = error
                );
        }
    });
