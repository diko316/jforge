'use strict';

var FS = require('fs');
var PATH = require('path');

var ACCESS = require('./access');

function parents(fullPath) {
    var path = PATH;
    var list = [];
    var length = 0;
    var from = fullPath;
    var next = null;

    for (; from !== next; from = path.dirname(from)) {
        list[length++] = next = from;
    }

    return list;
}

function mkdirp(fullPath) {
    var FILE = FS;
    var exist = ACCESS.isDirectory;
    var existFlag = 'rw';

    var list, c, length, createList, createLength, item,
        lastStat, umode, existed;


    list = parents(fullPath);
    length = list.length;
    c = 0;

    createList = [];
    createLength = 0;

    for (; length--; c++) {
        item = list[c];
        existed = exist(item, existFlag);

        lastStat = existed ? FILE.statSync(item) : null;

        // find path that exist or root
        if (existed || !length) {
            break;
        }
        createList[createLength++] = item;
    }

    if (createLength) {
        // must be a directory
        if (!lastStat) {
            return false;
        }

        umode = lastStat.mode;

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
