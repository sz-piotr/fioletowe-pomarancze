'use strict';

angular.module('core.fileSystem')
    .factory('FileSystem', function() {
        var fs = require('fs'),
            path = require('path');

        var homeFolder = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

        function compareFiles(a, b) {
            if(a.stats.isDirectory() !== b.stats.isDirectory()) {
                return a.stats.isDirectory() ? -1 : 1;
            } else if(a.name != b.name) {
                return a.name > b.name ? 1 : -1;
            } else {
                return 0;
            }
        }

        return {
            query(dir, options) {
                dir = dir || homeFolder;

                var files = fs.readdirSync(dir)
                    .map(filename => ({
                        name: filename,
                        path: path.join(dir, filename),
                        stats: fs.statSync(path.join(dir, filename))
                    })).sort(compareFiles);

                if(!options || !options.showHidden)
                    files = files.filter(file => !file.name.startsWith('.'));

                return files;
            }
        };
    });
