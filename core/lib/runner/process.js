'use strict';

var LIBCORE = require('libcore');
var OBJECT = require('../object');
var WORKER = require('../worker');

var string = LIBCORE.string;
var Collection = OBJECT.Collection;

function createHandler(handler, process) {
    return function () {
        return handler(process);
    };
}

function ProcessCollection() {
    Collection.apply(this, arguments);

    this.pendingJobs = [
        
    ];
}

OBJECT.extend(Collection, {

    cliOption: null,
    isRunning: false,

    constructor: ProcessCollection,

    onRunProcess: function (process) {
        var me = this;

        return this.runGuard(process)
                .then(function (allowed) {
                    // exit directly
                    return !allowed ?
                            process :
                            me.runRunners(process)
                                .then(function () {
                                    return process;
                                });
                })
                .then(function (process) {
                    me.onAfterProcess(process);
                    return process;
                })
                .catch(function (error) {
                    process.reportError(error);
                    me.onAfterProcess(process);
                    return process;
                });

    },

    onRunProcessHandlers: function (promise, process, list) {
        var me = this;
        var create = createHandler;
        var length = list.length;
        var c = 0;

        for (; length--; c++) {
            promise = promise
                        .then(create(list[c], process));
        }

        return promise;
    },

    onAfterProcess: function (process) {
        var errors = process.errors;
        var c, length;

        if (errors) {
            length = errors.length;
            c = 0;

            for (; length--; c++) {
                console.error(errors[c]);
            }
        }
    },

    isValidId: function (id) {
        return string(id) && WORKER.exist(id);
    },

    createItem: function (nothing, name) {
        return WORKER.create(name, this);
    },

    resolve: function (name) {
        if (!this.exists(name)) {
            this.add(name, null);    
        }
        return this.get(name);
    },

    run: function (name) {
        var me = this;

        return Promise.resolve(name)
            .then(function (name) {
                return me.resolve(name);
            })
            .then(function (process) {
                return me.onRunProcess(process);
            });
    },

    runGuard: function (process) {
        var handlers = process.handlers;
        var list;
        
        // guard
        list = handlers.guards;
        if (list) {
            process.allowed = false;
            return this.onRunProcessHandlers(
                            Promise.resolve(process),
                            process,
                            list
                        )
                    .then(function () {
                        return true;
                    })
                    .catch(function () {
                        return false;
                    });
        }

        return Promise.resolve(true);
    },

    runRunners: function (process) {
        var promise = Promise.resolve(process);
        var handlers = process.handlers;
        var list;

        list = handlers.pre;
        if (list) {
            promise = this.onRunProcessHandlers(
                            promise,
                            process,
                            list
                        );
        }

        list = handlers.runners;
        if (list) {
            promise = this.onRunProcessHandlers(
                            promise,
                            process,
                            list
                        );
        }

        list = handlers.post;
        if (list) {
            promise = this.onRunProcessHandlers(
                            promise,
                            process,
                            list
                        );
        }

        return promise;
    },

    
});

module.exports = {
    ProcessCollection: ProcessCollection
};
