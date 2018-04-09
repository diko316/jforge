'use strict';

var LIBCORE = require('libcore');
var FS = require('fs');
var NPATH = require('path');
var EXIST = require('./exist');
var PATH = require('./path');
var DIRECTORY = require('./directory');
var string = LIBCORE.string;

function showFileContent(path) {
    var content = getFileContent(path);

    if (content !== null) {
        console.log(content);
        return path;
    }

    return null;
}

function getFileContent(path) {
    path = PATH.fullpath(path);

    if (EXIST.is(path, 'file readable')) {
        try {
            return FS.readFileSync(path, {
                                            encoding: 'utf8',
                                            flag: 'r'
                                        });
        }
        catch (e) {}
    }

    return null;
}

function writeFileContent(path, data) {
    var exist = EXIST;
    var mkdirp = DIRECTORY.mkdirp;
    var stat, directory;

    if (string(data)) {
        path = PATH.fullpath(path);

        // ensure directory exists
        directory = NPATH.dirname(path);

        // create directory only if it does not exist
        if (!exist.exist(directory)) {
            directory = mkdirp(directory);
        }

        if (directory &&
            exist.is(directory, 'directory writable')
        ) {
            try {
                FS.writeFileSync(path,
                                data,
                                {
                                    encoding: 'utf8',
                                    flag: 'w',
                                    mode: 438 // this is 666
                                });
                return path;
            }
            catch (e) {
                console.log('error: ', e);
            }
        }
        
    }

    return null;
}

module.exports = {
    getContent: getFileContent,
    showContent: showFileContent,
    writeContent: writeFileContent
};
