'use strict';

angular
    .module('main.remotes')
    .component('remotes', {
        templateUrl: 'main/remotes/remotes.html',
        css: 'main/remotes/remotes.css',
        controller: function RemotesController(RemotesService) {

            this.goto = node => {
                this.node = node;
                this.breadcrumbs = node.ancestors();
                this.breadcrumbs.push(node);
                node.children().then(response => {
                    this.nodes = response;
                });
            }

            this.goto(RemotesService.get('/'));
        }
    });