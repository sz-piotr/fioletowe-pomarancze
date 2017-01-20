'use strict';

global.cfg = require('minimist')(require('nw.gui').App.argv, {
    string: ['server'],
    number: ['port'],
    alias: {
        server: ['s'],
        port: ['p']
    },
    default: {
        server: 'http://127.0.0.1:5000',
        port: '8111'
    }
});
