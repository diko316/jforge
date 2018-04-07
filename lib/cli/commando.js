'use strict';


var config = require('./config');
var FILE = require('../file');


function hasConfig() {
    var configFile = config.runner;
    return  FILE.exist(configFile) && configFile;
}

function hasParentConfig() {
    var configFile = config.parentRunner;
    return configFile ? configFile : false;
}

function hasCurrentConfig() {
    return hasConfig() || hasParentConfig();
}

module.exports = {
    command: config.cli,
    hasConfig: hasConfig,
    hasParentConfig: hasParentConfig,
    hasCurrentConfig: hasCurrentConfig
};
