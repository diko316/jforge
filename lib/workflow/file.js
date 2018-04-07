'use strict';

var PATH = require('path');
var LIBCORE = require('libcore');
var string = LIBCORE.string;
var CONFIG = require('../config');
var FILE = require('../file');

function getModuleDirectories() {
    var info = CONFIG.info;
    return [
        info.moduleDir,
        PATH.dirname(info.configPath)
    ];
}

function resolvePackageDirectory(name) {
    var isString = string;
    var file = FILE;
    var path = PATH;

    var directories, directory, fullPath, length, c;

    if (!isString(name)) {
        throw new Error('Invalid package [name] parameter.');
    }

    directories = getModuleDirectories();
    length = directories.length;
    c = 0;

    // resolve
    for (; length--; c++) {
        directory = directories[c];
        fullPath = path.join(directory, 'commando-' + name);

        if (file.is(fullPath, 'directory readable')) {
            return fullPath;
        }
    }

    return null;
}


module.exports = {
    resolveDirectory: resolvePackageDirectory
};