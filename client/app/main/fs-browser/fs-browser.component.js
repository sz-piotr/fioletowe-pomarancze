'use strict';

angular
    .module('fsBrowser')
    .component('fsBrowser', {
        templateUrl: 'main/fs-browser/fs-browser.html',
        css: 'main/fs-browser/fs-browser.css',
        controller: function FsBrowserController(FileSystem) {
            this.setDir = file => {
                if (file.directory) {
                    try {
                        this.breadcrumbs = file.ancestors();
                        this.files = FileSystem.query(file);
                        this.breadcrumbs.push(file);
                        delete this.error;
                    } catch (e) {
                        this.error = e.message;
                    }
                }
            };

            this.setDir(FileSystem.homeDirectory);
        }
    });
