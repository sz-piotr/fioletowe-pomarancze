'use strict';

global.cfg = require('minimist')(require('nw.gui').App.argv, {
    string: ['server','addr'],
    number: ['port'],
    boolean: ['debug'],
    alias: {
        server: ['s'],
        port: ['p'],
        debug: ['v'],
        listen: ['a']
    },
    default: {
        server: 'http://127.0.0.1:5000',
        port: '8111',
        addr: '0.0.0.0'
    }
});
