'use strict';

var FS = require('fs');
var EXIST = require('./exist');
var PATH = require('./path');


function showFileContent(path) {
    var content = getFileContent(path);

    if (content !== null) {
        console.log(content);
        return path;
    }

    return null;
}

function getFileContent(path) {
    path = PATH.fullpath(path);

    if (EXIST.is(path, 'file readable')) {
        return FS.readFileSync(path, {
                                        encoding: 'utf8',
                                        flag: 'r'
                                    });
    }

    return null;
}

module.exports = {
    getContent: getFileContent,
    showContent: showFileContent
};
