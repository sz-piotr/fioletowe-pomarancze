angular
    .module('main.groups')
    .component('groups', {
        templateUrl: 'main/groups/groups.html',
        css: 'main/groups/groups.css',
        controller: function GroupsController(GroupsService, SharesService) {
            this.update = () => {
                this.loadingGroups = true;
                this.groupsError = false;
                GroupsService.query()
                    .then(response => {
                            this.groups = response.data.groups
                            this.groupsError = false;
                        },
                        error => this.groupsError = "Oops! An error occured while loading groups.")
                    .finally(() => this.loadingGroups = false);
            }
            this.update();

            this.openAddGroupModal = () => {
                this.addGroupError = false;
                $('#add-group-modal').modal('show');
            }

            this.openAddShareModal = group => {
                this.selectedGroup = group;
                this.loadingShares = true;
                this.addShareError = false;
                SharesService.query()
                    .then(response => {
                        this.shares = [];
                        response.forEach(device => {
                            this.shares = this.shares.concat(device.shares);
                        });
                        this.addShareError = false;
                    }, error => this.addShareError = "Oops! An error occured while loading shares.")
                    .finally(() => this.loadingShares = false);
                $('#add-share-modal').modal('show');
            }

            this.openAddMemberModal = group => {
                this.selectedGroup = group;
                this.addMemberError = false;
                $('#add-member-modal').modal('show');
            }

            this.openRemoveGroupModal = group => {
                this.item = {
                    type: "group",
                    name: group.name
                }
                $('#delete-modal').modal('show');
            }

            this.openRemoveShareModal = (share, group) => {
                this.item = {
                    type: "share",
                    name: share.name,
                    from: {
                        type: "group",
                        name: group.name
                    }
                }
                $('#delete-modal').modal('show');
            }

            this.openRemoveMemberModal = (member, group) => {
                this.item = {
                    type: "member",
                    name: member.name,
                    from: {
                        type: "group",
                        name: group.name
                    }
                }
                $('#delete-modal').modal('show');
            }

            this.filterShares = share => {
                for (var other of this.selectedGroup.shares) {
                    if (share.name === other.name)
                        return false;
                }
                return true;
            }
        }
    });
