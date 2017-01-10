'use strict';

angular.module('core')
    .filter('checkmark', function() {
        return input => input ? '\u2713' : '\u2718';
    });
