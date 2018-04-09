'use strict';

var FILE = require('./file');
var DATA = require('./data');


module.exports = {
    findCwd: FILE.findCwd,
    restoreCwd: FILE.restoreCwd,
    cwd: FILE.cwd,
    has: FILE.has,
    push: DATA.push,
    pull: DATA.pull
};
