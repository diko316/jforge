'use strict';

var LIBCORE = require('libcore');
var string = LIBCORE.string;

function FileHandle(targetPath) {
    if (!string(targetPath)) {
        throw new Error('Invalid file [targetPath]');
    }
}


FileHandle.prototype = {
    path: null,
    data: undefined,
    constructor: FileHandle,

    set: function () {

    },

    get: function () {

    },

    commit: function () {

    },

    exists: function () {

    }

};


module.exports = FileHandle;