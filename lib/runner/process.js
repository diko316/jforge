'use strict';

var LIBCORE = require('libcore');
var OBJECT = require('../object');
var WORKER = require('../worker');

var string = LIBCORE.string;
var Collection = OBJECT.Collection;

function ProcessCollection() {
    Collection.apply(this, arguments);

    this.pendingJobs = [
        
    ];
}

OBJECT.extend(Collection, {

    cliOption: null,
    isRunning: false,

    constructor: ProcessCollection,

    isValidId: function (id) {
        console.log('is valid? ', id);
        return string(id) && WORKER.exist(id);
    },

    createItem: function (nothing, name) {
        return WORKER.create(name, this);
    },

    resolve: function (name) {
        console.log('resolving ', name);
        if (this.exists(name)) {
            console.log('reuse');
            return this.get(name);
        }
        console.log('adding');
        return this.add(name, null);
    },

    push: function (name) {
        var process = this.resolve(name);

        return process;
    },


    run: function () {
        if (!this.running) {
            this.running = true;
        }

        return this;
    }
});

module.exports = {
    ProcessCollection: ProcessCollection
};
