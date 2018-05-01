'use strict';

var jforge = require('jforge');
var path = require('path');
var helpFile = path.join(__dirname, 'help.txt');


function callback() {
    jforge.logError(jforge.readFile(helpFile));
}


module.exports = callback;
