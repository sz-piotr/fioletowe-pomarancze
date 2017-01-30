'use strict';

angular
    .module('main.remotes')
    .component('remotes', {
        templateUrl: 'main/remotes/remotes.html',
        css: 'main/remotes/remotes.css',
        controller: function RemotesController(RemotesService) {
            this.goto = node => {
                this.loading = true;
                this.node = node;
                this.breadcrumbs = node.ancestors();
                this.breadcrumbs.push(node);
                node.children().then(
                    response => {
                        console.log(response);
                        delete this.error;
                        this.nodes = response;
                    },
                    error => {
                        this.nodes = [];
                        this.error = error;
                    }
                ).finally(() => this.loading = false);
            }

            RemotesService.getRoot()
                .then(
                    response => this.goto(response),
                    error => this.error = error
                );
        }
    });
