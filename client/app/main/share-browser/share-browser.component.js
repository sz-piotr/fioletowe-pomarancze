'use strict';

angular
    .module('main.shareBrowser')
    .component('shareBrowser', {
        templateUrl: 'main/share-browser/share-browser.html',
        css: 'main/share-browser/share-browser.css',
        controller: function ShareBrowserController(ShareService) {
            ShareService.query()
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
        }
    });
