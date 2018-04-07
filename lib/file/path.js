'use strict';

var LIBCORE = require('libcore');
var PATH = require('path');
var string = LIBCORE.string;


function fullpath(file) {
    var path = PATH;

    if (!string(file)) {
        throw new Error('Invalid file parameter.');
    }

    // use directory in file if absolute
    if (path.isAbsolute(file)) {
        return file;
    }

    return path.join(process.cwd(), file);
}

function parentPaths(fullPath) {
    var path = PATH;
    var list = [];
    var length = 0;
    var from = fullpath(fullPath);
    var next = null;

    for (; from !== next; from = path.dirname(from)) {
        list[length++] = next = from;
    }

    return list;
}


module.exports = {
    fullpath: fullpath,
    parentPaths: parentPaths
};
