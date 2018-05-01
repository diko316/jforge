'use strict';

var PATH = require('path');
var FILE = require('../file');
var LOG = require('./log');


function get(name) {
    return FILE.readFile(PATH.join(__dirname, name + '.txt'));
}

module.exports = {
    get: get,
    logError: LOG.logError
};
