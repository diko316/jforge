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

module.exports = {
    fullpath: fullpath
};
