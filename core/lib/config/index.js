'use strict';

var directory = require('./directory');
var file = require('./file');

var use = require('./use');



module.exports = {
    DIRECTORY: directory.CONFIG_DIR,
    directory: directory.directory,
    hasDirectory: directory.hasDirectory,
    resolveDirectory: directory.resolve,

    CONFIG_FILE: file.CONFIG_FILE,
    hasFile: file.hasFile,
    file: file.location,
    resolveFile: file.resolve,

    useDirectory: use.useDirectory
};
