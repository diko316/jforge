'use strict';

var FS = require('fs');
var access = require('./access');

function read(path) {
    if (access.isFile(path, 'r')) {
        try {
            return FS.readFileSync(path, {
                encoding: 'utf8',
                flag: 'r'
            });
        }
        catch (e) {
            console.error(e);
        }
    }

    return null;
}


module.exports = {
    read: read
};
