'use strict';

var LIB = require('libcore');
var FS = require('fs');
var PATH = require('path');
var ACCESS = require('./access');
var DIRECTORY = require('./directory');
var ERROR = require('../error');

var string = LIB.string;

function read(path) {
    if (ACCESS.isFile(path, 'r')) {
        try {
            return FS.readFileSync(path, {
                encoding: 'utf8',
                flag: 'r'
            });
        }
        catch (e) {
            ERROR.logError(e);
        }
    }

    return null;
}

function write(path, data) {
    var access = ACCESS;
    var directory;

    if (string(data, true)) {
        // ensure directory exists
        directory = PATH.dirname(path);

        // create directory only if it does not exist
        if (!access.isDirectory(directory, 'rw')) {
            directory = DIRECTORY.mkdirp(directory);
        }

        if (directory && access.isDirectory(directory, 'rw')) {
            try {
                FS.writeFileSync(
                    path,
                    data,
                    {
                        encoding: 'utf8',
                        flag: 'w',
                        mode: 438 // this is 666
                    }
                );

                return path;
            }
            catch (e) {
                ERROR.logError(e);
            }
        }
        
    }

    return null;
}


module.exports = {
    read: read,
    write: write
};
