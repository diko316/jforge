'use strict';

var jforge = require('jforge');
var cwd = process.cwd();

module.exports = {
    workingDirectory: cwd,
    rootDirectory: jforge.configDirectory(cwd),
    configFile: jforge.configFile(cwd)
};
