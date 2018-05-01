'use strict';

var LIB = require('libcore');
var OS = require('os');
var EOL = OS.EOL;
var number = LIB.number;

function logError(error, errorLevel) {
    var eol = EOL;

    if (error instanceof Error) {
        error = error.toString();
    }

    process.stderr.write(
        ([
            error,
            ''
        ]).join(eol) + eol);

    if (number(errorLevel)) {
        process.exit(errorLevel);
    }
}

module.exports = {
    logError: logError
};
