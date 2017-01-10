'use strict';

angular.module('core.fileSystem')
    .factory('FileSystem', function() {
        var homeFolder = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];

        console.log(homeFolder);

        function compareFiles(a, b) {
            if(a.directory !== b.directory) {
                return a.directory ? -1 : 1;
            } else if(a.name != b.name) {
                return a.name > b.name ? 1 : -1;
            } else {
                return 0;
            }
        }

        return {
            homeDirectory: new File(homeFolder),
            query(dir, options) {
                var files = dir.children().sort(compareFiles);

                if(!options || !options.showHidden)
                    files = files.filter(file => !file.name.startsWith('.'));

                return files;
            }
        };
    });
