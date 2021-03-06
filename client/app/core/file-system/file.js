'use strict';

var File = (function() {
    var fs = require('fs'),
        path = require('path');

    return class File {
        constructor(filepath) {
            this.path = filepath;
            this.name = path.basename(filepath);
            try {
                this.directory = fs.statSync(filepath).isDirectory();
            } catch(e) {
                this.directory = false;
                this.error = true;
            }
        }

        children() {
            return fs.readdirSync(this.path).map(
                filename => new File(path.join(this.path, filename))
            );
        }

        ancestors() {
            var ancestors = [];
            var current = this.path;
            while (true) {
                var parent = path.dirname(current);
                if (parent === current)
                    break;
                current = parent;
                ancestors.push(new File(current));
            }
            return ancestors.reverse();
        }
    };
})();
