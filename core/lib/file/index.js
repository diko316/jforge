'use strict';


var access = require('./access');
var content = require('./content');
var directory = require('./directory');


module.exports = {
    isFile: access.isFile,
    isDirectory: access.isDirectory,

    mkdirp: directory.mkdirp,

    readFile: content.read,
    writeFile: content.write
};
