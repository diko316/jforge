'use strict';

var config = require('./config-file');
var shell = require('./shell');
var options = require('./options');

module.exports = {
    configFile: config.location,
    hasConfig: config.hasFile,
    createConfig: config.createFile,
    prompt: shell.prompt,
    arguments: options.create
};

