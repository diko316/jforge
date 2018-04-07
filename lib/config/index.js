'use strict';


var file = require('./file');
var manifest = require('./manifest');

function getConfig() {
    return manifest.config;
}

module.exports = {
    fileInfo: file.fileInfo,
    push: file.push,
    pull: file.pull,
    info: manifest,
    get: getConfig
};
