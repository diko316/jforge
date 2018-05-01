'use strict';

var LIB = require('libcore');
var number = LIB.number;

function logError(error, errorLevel) {
    if (error instanceof Error) {
        error = error.toString();
    }
    process.stderr.write(
        ([
            '',
            error,
            ''
        ]).join('\r\n'));

    if (number(errorLevel)) {
        process.exit(errorLevel);
    }
}

module.exports = {
    logError: logError
};
