'use strict';

var jforge = require('jforge');
var path = require('path');

var inspectRequirements = require('./workflow/inspect-requirements');
var createDirectory = require('./workflow/create-directory');
var createConfigFile = require('./workflow/create-config-file');
var createRunnerFile = require('./workflow/create-runner-file');

function callback(options) {
    console.log('init! ', options);

    return inspectRequirements()
            .then(createDirectory)
            .then(createConfigFile)
            .then(createRunnerFile);
}


module.exports = callback;
