'use strict';

var FS = require('fs');
var PATH = require('path');
var LIB = require('libcore');
var string = LIB.string;
var WRITE_FLAG = /w/;
var READ_FLAG = /r/;
var EXECUTE_FLAG = /x/;

function access(path, flag) {
    var fs = FS;
    var constants = fs.constants;

    if (!string(flag)) {
        return false;
    }

    // is writable
    if (WRITE_FLAG.test(flag)) {
        try {
            fs.accessSync(path, constants.W_OK);
        }
        catch (e) {
            return false;
        }
    }

    if (READ_FLAG.test(flag)) {
        try {
            fs.accessSync(path, constants.R_OK);
        }
        catch (e) {
            return false;
        }
    }

    if (EXECUTE_FLAG.test(flag)) {
        try {
            fs.accessSync(path, constants.X_OK);
        }
        catch (e) {
            return false;
        }
    }
    
    return true;
}

function umode(path) {
    
}

function isDirectory(path, flag) {
    var fs = FS;
    var constants = fs.constants;
    var stat;

    try {
        stat = FS.statSync(path);
    }
    catch (e) {
        return false;
        // do nothing
    }

    if (!stat.isDirectory()) {
        return false;
    }

    if (string(flag)) {
        return access(path, flag);
    }

    return true;
}

function isFile(path, flag) {
    var fs = FS;
    var constants = fs.constants;
    var stat;

    try {
        stat = FS.statSync(path);
    }
    catch (e) {
        return false;
        // do nothing
    }

    if (!stat.isFile()) {
        return false;
    }

    if (string(flag)) {
        return access(path, flag);
    }

    return true;
}

module.exports = {
    isFile: isFile,
    isDirectory: isDirectory
};