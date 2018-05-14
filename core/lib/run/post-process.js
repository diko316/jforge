'use strict';

var CHILDREN = require('./children');

function postProcess(childProcess, spec) {
    return new Promise(function (resolve, reject) {
        var children = CHILDREN;
        var child = childProcess;
        var options = spec[2];
        var handler = spec[3];
        var thread = options.thread;
        var stdout = child.stdout;
        var stderr = child.stderr;

        function onData(message, handle) {
            handler.onMessage(message, child, handle);
        }

        function onStdOutData(data) {
            handler.onOutput(data, child);
        }

        function onStdErrorData(data) {
            handler.onOutputError(data, child);
        }

        function onExit() {
            var child = childProcess;
            var me = onExit;

            // stdout.removeListener('data', onStdOutData);
            // stderr.removeListener('data', onStdErrorData);

            child.removeListener('message', onData);
            child.removeListener('error', handler.onError);
            child.removeListener('exit', handler.onExit);

            child.removeListener('error', me);
            child.removeListener('close', me);
            child.removeListener('exit', me);
            
            resolve(child);
            stdout = stderr = child = null;
        }
        // register
        child.addListener('message', onData);
        child.addListener('error', handler.onError);
        child.addListener('exit', handler.onExit);

        child.addListener('error', onExit);
        child.addListener('close', onExit);
        child.addListener('exit', onExit);
        
        // stderr.addListener('data', onStdErrorData);
        // stdout.addListener('data', onStdOutData);
        // child.stderr.pipe(process.stderr);
        // child.stdout.pipe(process.stdout);

        CHILDREN.register(child, options.thread);

        // fire on ready
        try {
            handler.onReady(child, options);
        }
        catch (error) {
            reject(error);
            return;
        }
    });
}

module.exports = postProcess;
