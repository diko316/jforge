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

    afterRunning: function () {

    },

    push: function (name) {
        var pending = this.pendingJobs;
        var length = pending.length;
        var process = this.resolve(name);

        console.log('running ', name);
        return process;
    }
});

module.exports = {
    ProcessCollection: ProcessCollection
};
