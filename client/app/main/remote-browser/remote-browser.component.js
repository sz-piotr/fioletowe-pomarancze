'use strict';

angular
    .module('main.remoteBrowser')
    .component('remoteBrowser', {
        templateUrl: 'main/remote-browser/remote-browser.html',
        css: 'main/remote-browser/remote-browser.css',
        controller: function RemoteBrowserController(RemoteService) {

            this.goto = node => {
                this.node = node;
                this.breadcrumbs = node.ancestors();
                this.breadcrumbs.push(node);
                node.children().then(response => {
                    this.nodes = response;
                });
            }

            this.goto(RemoteService.get('/'));
        }
    });
