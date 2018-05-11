'use strict';



function postProcess(childProcess, spec) {
    return new Promise(function (resolve, reject) {
        var isError = false;
        var errorObject = null;
        var child = childProcess;
        var handler = spec[3];

        function onError(error) {
            var item = options.onError;

            isError = true;
            errorObject = error;

            handler.onError.call(null, error);
        }

        function onExit(code, signal) {
            var childProcess = child;
            var error = isError;
            
            handler.onExit(
                error,
                childProcess.stdout,
                childProcess.stderr
            );

            // remove listeners
            childProcess.removeAllListeners('exit');
            childProcess.removeAllListeners('message');
            childProcess.removeAllListeners('error');

            if (error) {
                errorObject.exitCode = code;
                errorObject.exitSignal = signal;
                console.error('rejected!');
                reject(errorObject);
            }
            else {
                console.error('resolved!');
                resolve(code);
            }
        }

        child.on('exit', onExit);
        child.on('message', handler.onMessage);
        child.on('error', onError);
    });
}

module.exports = postProcess;
