'use strict';

var FS = require('fs');
var PATH = require('path');
var EXIST = require('./exist');
var FILE_PATH = require('./path');


function mkdirp(fullPath) {
    var FILE = FS;
    var path = PATH;
    var filePath = FILE_PATH;
    var is = EXIST.is;
    var exist = EXIST.exist;
    var list, c, length, createList, createLength, item, dir, lastStat, umode;


    fullPath = filePath.fullpath(fullPath);

    list = filePath.parentPaths(fullPath);
    length = list.length;
    c = 0;

    createList = [];
    createLength = 0;

    for (; length--; c++) {
        item = list[c];

        // find path that exist or root
        lastStat = exist(item);
        if (lastStat || !length) {
            break;
        }
        createList[createLength++] = item;
    }

    if (createLength) {
        // must be a directory
        if (!lastStat || !lastStat.isDirectory || !lastStat.isWritable) {
            return false;
        }

        umode = lastStat.stat.mode;

        for (; createLength--;) {
            item = createList[createLength];

            try {
                FILE.mkdirSync(item, umode);
            }
            catch (e) {
                return false;
            }
        }
    }

    return fullPath;
}


module.exports = {
    mkdirp: mkdirp
};
