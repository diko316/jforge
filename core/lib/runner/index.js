'use strict';

var file = require('./file');

module.exports = {
    RUNNER_FILE: file.RUNNER_FILE,
    hasFile: file.hasFile,
    file: file.location,
    resolveFile: file.resolve
};
