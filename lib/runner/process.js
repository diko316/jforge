'use strict';

var LIBCORE = require('libcore');
var OBJECT = require('../object');
var WORKER = require('../worker');

var string = LIBCORE.string;
var Collection = OBJECT.Collection;

function ProcessCollection() {
    Collection.apply(this, arguments);
}

OBJECT.extend(Collection, {

    constructor: ProcessCollection,

    isValidId: function (id) {
        return string(id) && WORKER.exist(id);
    },

    createItem: function (nothing, name) {
        return WORKER.create(name, this);
    },

    resolve: function (name) {
        if (this.exists(name)) {
            return this.get(name);
        }
        
        return this.add(name, null);
    },

    push: function (name) {
        var process = this.resolve(name);

        return process;
    }
});

module.exports = {
    ProcessCollection: ProcessCollection
};
