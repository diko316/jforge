'use strict';

var CHILD = require('child_process');
var LIBCORE = require('libcore');
var string = LIBCORE.string;

function exec(command) {

    if (string(command)) {
        return new Promise(function (resolve, reject) {
            function callback(error, stdout, stderr) {
                if (stderr) {
                    console.error(stderr);
                }

                if (error) {
                    reject(error);
                }
                else {
                    resolve(stdout);
                }
            }

            CHILD.exec(command, callback);
        });
    }

    return Promise.reject(new Error("Invalid command parameter."));
}

module.exports = {
    exec: exec
}