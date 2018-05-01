'use strict';


var access = require('./access');
var content = require('./content');


module.exports = {
    isFile: access.isFile,
    isDirectory: access.isDirectory,

    readFile: content.read
};
