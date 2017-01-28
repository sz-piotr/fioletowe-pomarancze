angular
    .module('main.groups')
    .component('groups', {
        templateUrl: 'main/groups/groups.html',
        css: 'main/groups/groups.css',
        controller: function GroupsController(GroupsService, SharesService, $scope) {
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
                delete this.group;
                this.addGroupError = false;
                $scope.addgroupform.$setPristine();
                $scope.addgroupform.$setUntouched();
                $('#add-group-modal').modal('show');
            }

            this.addGroup = () => {
                $scope.addgroupform.$submitted = true;
                if (!$scope.addgroupform.$invalid) {
                    console.log('Group', this.group);
                    this.submitting = true;
                    this.addGroupError = "Adding groups is not implemented";
                    // TODO add group here! GroupService.addGroup
                    this.submitting = false;
                }
            }

            this.openAddShareModal = group => {
                delete this.share;
                this.selectedGroup = group;
                this.addShareError = false;
                $scope.addshareform.$setPristine();
                $scope.addshareform.$setUntouched();
                this.loadingShares = true;
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

            this.addShare = () => {
                $scope.addshareform.$submitted = true;
                if (!$scope.addshareform.$invalid) {
                    console.log('Selected Group', this.selectedGroup);
                    console.log('Share', this.share);
                    this.submitting = true;
                    this.addShareError = "Adding shares is not implemented";
                    // TODO add share here! GroupService.addShare
                    this.submitting = false;
                }
            }

            this.openAddMemberModal = group => {
                delete this.member;
                this.selectedGroup = group;
                this.addMemberError = false;
                $scope.addmemberform.$setPristine();
                $scope.addmemberform.$setUntouched();
                $('#add-member-modal').modal('show');
            }

            this.addMember = () => {
                $scope.addmemberform.$submitted = true;
                if (!$scope.addmemberform.$invalid) {
                    console.log('Selected Group', this.selectedGroup);
                    console.log('Member', this.member);
                    this.submitting = true;
                    this.addMemberError = "Adding members is not implemented";
                    // TODO add share here! GroupService.addMember
                    this.submitting = false;
                }
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
