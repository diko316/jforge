#!/usr/bin/env node

'use strict';

var PATH = require('path');
var FS = require('fs');
var CONFIG_DIR = '.jforge';
var CONFIG_FILE = 'config.yml';

function configFile() {
    return PATH.join(process.cwd(), CONFIG_DIR, CONFIG_FILE);
}


function hasFile() {
    var fs = FS;
    var constants = fs.constants;
    var path = configFile();
    var exists = false;

    var stat;

    try {
        stat = FS.statSync(path);
        return stat.isFile() &&
                fs.accessSync(path, constants.R_OK) &&
                fs.accessSync(path, constants.W_OK);
    }
    catch (e) {
        // do nothing
    }

    return false;
}

function createFile() {

}



module.exports = {
    hasFile: hasFile,
    createFile: createFile,
    location: configFile
};
