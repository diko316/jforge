'use strict';

var LIB = require('libcore');
var SEND = require('./send');

function prompt(question) {
    if (LIB.string(question, true)) {
        return SEND(
                    'prompt',
                    {
                        text: question
                    });
    }

    return Promise.reject(new Error('Invalid prompt [question]'));
}

module.exports = prompt;