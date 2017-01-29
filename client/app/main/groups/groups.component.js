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
                    this.submitting = true;
                    GroupsService.addGroup(this.group.name)
                        .then(
                            response => {
                                this.addGroupError = false;
                                $('#add-group-modal').modal('hide');
                                this.update();
                            }, error => this.addGroupError = error
                        ).finally(() => this.submitting = false);
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
                    this.submitting = true;
                    GroupsService.addShare(this.share.name, this.selectedGroup.name)
                        .then(
                            response => {
                                this.addShareError = false;
                                $('#add-share-modal').modal('hide');
                                this.update();
                            }, error => this.addShareError = error
                        ).finally(() => this.submitting = false);
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
                    this.submitting = true;
                    GroupsService.addMember(this.member.email, this.selectedGroup.name)
                        .then(
                            response => {
                                this.addMemberError = false;
                                $('#add-member-modal').modal('hide');
                                this.update();
                            }, error => this.addMemberError = error
                        ).finally(() => this.submitting = false);
                }
            }

            this.openRemoveGroupModal = group => {
                this.item = {
                    type: "group",
                    name: group.name
                }
                this.deleteError = false;
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
                this.deleteError = false;
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
                this.deleteError = false;
                $('#delete-modal').modal('show');
            }

            this.deleteItem = () => {
                this.submitting = true;
                var item = this.item;
                switch (item.type) {
                case "group":
                    var promise = GroupsService.removeGroup(item.name);
                    break;
                case "share":
                    var promise = GroupsService.removeShare(item.name, item.from.name);
                    break;
                case "member":
                    var promise = GroupsService.removeMember(item.name, item.from.name);
                    break;
                }
                promise.then(
                    response => {
                        this.deleteError = false;
                        $('#delete-modal').modal('hide');
                        this.update();
                    }, error => this.deleteError = error
                ).finally(() => this.submitting = false);
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
