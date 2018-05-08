'use strict';


function observeStreams(childProcess, onStdOut, onStdError) {
    childProcess.stdout.on(
        'data',
        onStdOut);

    childProcess.stderr.on(
        'data',
        onStdError);
}

function unobserveStreams(childProcess) {
    childProcess.stdout.removeAllListeners('data');
    childProcess.stderr.removeAllListeners('data');
}


function postProcess(childProcess, spec) {
    return new Promise(function (resolve, reject) {
        var isError = false;
        var errorObject = null;
        var child = childProcess;
        var handler = spec[3];

        observeStreams(child, handler.onStdOut, handler.onStdError);

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

            unobserveStreams(childProcess);

            if (error) {
                errorObject.exitCode = code;
                errorObject.exitSignal = signal;
                console.log('rejected!');
                reject(errorObject);
            }
            else {
                console.log('resolved!');
                resolve(code);
            }
        }

        child.on('exit', onExit);
        child.on('message', handler.onMessage);
        child.on('error', onError);
    });
}

module.exports = postProcess;
