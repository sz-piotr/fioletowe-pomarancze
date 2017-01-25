'use strict';

angular
    .module('main.shareBrowser')
    .component('shareBrowser', {
        templateUrl: 'main/share-browser/share-browser.html',
        css: 'main/share-browser/share-browser.css',
        controller: function ShareBrowserController(ShareService) {
            this.update = () => ShareService.query()
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
