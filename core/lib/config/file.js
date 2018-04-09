'use strict';

var LIBCORE = require('libcore');
var FILE = require('../file');
var PATH = require('path');

var string = LIBCORE.string;
var object = LIBCORE.object;
var CONFIG_ROOT_DIRECTORY = '.jforge';
var CONFIG_FILE = 'config.json';
var ROOT_DIRECTORY = process.cwd();
var ORIGINAL_DIRECTORY = ROOT_DIRECTORY;

function findDirectory() {
    var directory = FILE.tracePath(
                        CONFIG_ROOT_DIRECTORY,
                        currentDirectory(),
                        'directory readable writable'
                    );

    if (directory) {
        return PATH.dirname(directory);
    }

    return false;
}

function findChangeDirectory() {
    var directory = findDirectory();

    if (directory) {
        return currentDirectory(directory);
    }

    return ROOT_DIRECTORY;
}

function restoreDirectory() {
    return currentDirectory(ORIGINAL_DIRECTORY);
}

function currentDirectory(directory) {
    var old = ROOT_DIRECTORY;
    var file = FILE;

    if (string(directory)) {
        directory = file.fullPath(directory);

        if (file.is(directory, 'directory readable writable')) {
            if (old !== directory) {
                ROOT_DIRECTORY = directory;
                process.chdir(directory);
            }

            return directory;
        }
    }

    return ROOT_DIRECTORY;
}

function hasConfigFile() {
    var is = FILE.is;

    // inspect if has config file in current directory
    var fullPath = PATH.join(
                            currentDirectory(),
                            CONFIG_ROOT_DIRECTORY,
                            CONFIG_FILE
                        );
    
    return FILE.is(fullPath, 'file readable writable') ? fullPath : false;
}

function pullContent() {
    var path = hasConfigFile();
    var content;

    if (path) {
        content = FILE.getFileContent(path);

        if (string(content)) {
            try {
                return JSON.parse(content);
            }
            catch (e) {}
        }
    }

    return null;
}

function pushContent(data) {
    if (!object(data)) {
        data = {};
    }

    try {
        data = JSON.stringify(data, null, 4);

        return FILE.writeFileContent(
                    PATH.join(
                        currentDirectory(),
                        CONFIG_ROOT_DIRECTORY,
                        CONFIG_FILE
                    ),
                    data
                );
    }
    catch (e) {
        console.log('error ', e);
    }

    return null;
}

module.exports = {
    findCwd: findChangeDirectory,
    restoreCwd: restoreDirectory,
    cwd: currentDirectory,
    has: hasConfigFile,
    push: pushContent,
    pull: pullContent
};
