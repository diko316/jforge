'use strict';

var CONFIG = require('./config-file');
var ERROR = require('../error');

function directExecCommand(command, options) {
    var entry = 'jforge-' + command;
    var callback = null;

    try {
        callback = require(entry);
    }
    catch (e) {
        ERROR.logError('task: ' + entry + ' not found.');
        return Promise.reject(e);
    }

    try {
        return Promise.resolve(callback(options));
    }
    catch (e) {
        ERROR.logError('task: ' + entry + ' runtime is erroneous.');
        return Promise.reject(e);
    }
}

function execCommand(command, options) {

}

module.exports = {
    directExecCommand: directExecCommand
};
