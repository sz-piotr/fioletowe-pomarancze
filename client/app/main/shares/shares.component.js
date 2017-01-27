'use strict';

angular
    .module('main.shares')
    .component('shares', {
        templateUrl: 'main/shares/shares.html',
        css: 'main/shares/shares.css',
        controller: function SharesController(SharesService) {
            this.update = () => SharesService.query()
                .then(
                    response => {
                        this.devices = response;
                        this.shares = [];
                        this.devices.forEach(device => {
                            this.shares = this.shares.concat(device.shares);
                        });
                    },
                    error => this.error = error.message
                );

            this.deleteDevice = device => {
                this.item = {
                    name: device.name,
                    type: 'device'
                }
                $('#delete-modal').modal('show');
            };

            this.deleteShare = share => {
                this.item = {
                    name: share.name,
                    type: 'share'
                }
                $('#delete-modal').modal('show');
            };

            this.deletePath = path => {
                this.item = {
                    name: path.name,
                    type: 'path'
                }
                $('#delete-modal').modal('show');
            };

            this.update();
        }
    });
