'use strict';

angular
    .module('main.shareBrowser')
    .component('shareBrowser', {
        templateUrl: 'main/share-browser/share-browser.html',
        css: 'main/share-browser/share-browser.css',
        controller: function ShareBrowserController(ShareService) {
            ShareService.query()
                .then(response => this.devices = response);
        }
    });
