'use strict';

angular
    .module('fsBrowser')
    .component('fsBrowser', {
        templateUrl: 'fs-browser/fs-browser.html',
        css: 'fs-browser/fs-browser.css',
        controller: function FsBrowserController(FileSystem) {
            this.files = FileSystem.query();

            this.setDir = file => {
                if (file.stats.isDirectory())
                    this.files = FileSystem.query(file.path);
            };
        }
    });
