'use strict';

var LIB = require('libcore');
var prompt = require('./prompt');

var object = LIB.object;
var string = LIB.string;

function normalize(message) {
    var isObject = object;
    var isString = string;
    var type, data, id;

    if (isObject(message)) {
        type = message.type;
        id = message.eventId;
        data = message.data;

        if (isString(type) && isString(id)) {
            return {
                type: type,
                id: id,
                data: isObject(data) ? data : null
            };
        }
    }

    return null;
}


function onMessage(message, child) {
    var childProcess = child;
    var type, data, id;

    message = normalize(message);

    function onEnd(answer) {
        childProcess.send({
                type: type,
                eventId: id,
                data: answer
            },
            function () {
                childProcess = null;
            });
    }

    if (message) {
        type = message.type;
        data = message.data;
        id = message.id;
        switch (type) {
            case 'prompt':
                prompt(data ? data.text : '').then(onEnd);
        }
    }
}

module.exports = {
    handler: onMessage
};