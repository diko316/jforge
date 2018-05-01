'use strict';

var PATH = require('path');
var CONFIG = require('../config');
var RUNNER = require('../runner');
var ERROR = require('../error');

function directExecCommand(command, options) {
    var entry = 'jforge-' + command;
    var callback = null;

    try {
        callback = require(entry);
    }
    catch (e) {
        console.error(e);
        ERROR.logError('Task Error: ' + entry + ' not found.');
        return Promise.reject(e);
    }

    try {
        return Promise.resolve(callback(options));
    }
    catch (e) {
        ERROR.logError('Task Error: ' + entry + ' runtime is erroneous.');
        return Promise.reject(e);
    }
}

function execCommand(command, options) {
    var original = process.cwd();
    var configDir = CONFIG.resolveDirectory(workDir);
    var cwd;

    if (configDir) {
        cwd = PATH.dirname(configDir);
        console.log('naa work directory! ', cwd);
    }
}

module.exports = {
    directExecCommand: directExecCommand
};
