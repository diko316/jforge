'use strict';

var LIB = require('libcore');
var processor = require('./processor');

var object = LIB.object;
var string = LIB.string;
var REGISTRY = LIB.createRegistry();

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
    var type;

    function onEnd(answer) {
        return new Promise(function (resolve) {
                childProcess.send({
                    type: type,
                    eventId: message.id,
                    data: answer
                },
                function () {
                    resolve(childProcess);
                    childProcess = null;
                })
            });
    }

    message = normalize(message);

    if (message) {
        type = message.type;

        if (processor.exists(type)) {
            processor.resolve(type)
                    .call(null, message.data, child)
                    .then(onEnd);
        }
    }
}


module.exports = {
    handler: onMessage
};