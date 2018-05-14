'use strict';



function send(type, message) {
    var PROCESS = process;
    var id = '' + (new Date()).getTime();
    

    return new Promise(function (resolve) {
        function onReceive(data) {
            if (data.eventId === id) {
                PROCESS.removeListener('message', onReceive);
                resolve(data.data);
            }
        }

        PROCESS.on('message', onReceive);

        PROCESS.send({
            type: type,
            eventId: id,
            data: message
        });
    });
    
}

module.exports = send;