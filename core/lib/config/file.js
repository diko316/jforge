'use strict';

var LIBCORE = require('libcore');
var FILE = require('../file');
var PATH = require('path');

var string = LIBCORE.string;
var object = LIBCORE.object;
var CONFIG_ROOT_DIRECTORY = '.jforge';
var CONFIG_FILE = 'config.json';

function findDirectory() {
    return FILE.tracePath(
                        CONFIG_ROOT_DIRECTORY,
                        process.cwd(),
                        'directory readable writable'
        );
}

function createConfig(rootPath, data) {
    if (string(rootPath)) {

    }
    if (!object(data)) {
        data = {};
    }

    try {
        data = JSON.stringify(data);

        return FILE.writeFileContent(
                    PATH.join(
                        rootPath,
                        CONFIG_ROOT_DIRECTORY,
                        CONFIG_FILE
                    ),
                    data
                );
    }
    catch (e) { }

    return null;
}

function hasConfigFile(inCurrentDirectory) {
    var is = FILE.is;

    // inspect if has config file in current directory
    var directory = inCurrentDirectory === true ?
                        PATH.join(
                            process.cwd(),
                            CONFIG_ROOT_DIRECTORY
                        ) :
                        findDirectory();
    var fullPath = directory ? PATH.join(directory, CONFIG_FILE ) : null;
    
    return fullPath && FILE.is(fullPath, 'file readable writable') ?
                        fullPath : false;
}

function getContent(inCurrentDirectory) {
    var directory = inCurrentDirectory === true ?
                            PATH.join(
                                process.cwd(),
                                CONFIG_ROOT_DIRECTORY
                            ) :
                            findDirectory();
    var content;

    if (directory) {
        content = FILE.getFileContent(
                    PATH.join(directory, CONFIG_FILE)
        );

        if (string(content)) {
            try {
                return JSON.parse(content);
            }
            catch (e) {}
        }
    }

    return null;
}

function createContent(data, inCurrentDirectory) {
    // inspect if has config file in current directory
    var directory = inCurrentDirectory === true ?
                        PATH.join(
                            process.cwd(),
                            CONFIG_ROOT_DIRECTORY
                        ) :
                        findDirectory();

    return createConfig(directory, data);
}

function push(data) {
    return createContent(data, false);
}

function pull() {
    return getContent(false);
}

module.exports = {
    has: hasConfigFile,
    getContent: getContent,
    createContent: createContent,
    push: push,
    pull: pull
};
