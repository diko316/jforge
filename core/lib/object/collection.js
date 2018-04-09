'use strict';

var LIBCORE = require('libcore');
var string = LIBCORE.string;
var number = LIBCORE.number;
var object = LIBCORE.object;

function Collection() {
    this.registry = LIBCORE.createRegistry();
    this.ids = [];
}


Collection.prototype = {
    registry: null,
    ids: null,
    constructor: Collection,

    isValidId: function (id) {
        return string(id) || number(id);
    },

    isValidItem: function (item) {
        return object(item);
    },

    createItem: function (config) {
        return config;
    },

    onAdd: function (item, id, index) {

    },

    onRemove: function (item, id, index) {

    },

    add: function (id, index, item) {
        var registry = this.registry;
        var ids = this.ids;
        var totalIds = ids.length;
        var exists, currentIndex;

        if (!this.isValidId(id)) {
            throw new Error('Invalid record [id] parameter.');
        }

        currentIndex = ids.indexOf(id);
        exists = currentIndex !== -1;

        if (arguments.length < 3) {
            item = index;
            index = exists ? currentIndex : totalIds;
        }

        if (!number(index) || index < 0) {
            throw new Error('Invalid record order [index] parameter');
        }

        // transform
        item = this.createItem(item, id);

        if (!this.isValidItem(item)) {
            throw new Error('Invalid record [item] parameter.');
        }

        // reorder
        if (exists) {
            // normalize index
            index = Math.max(totalIds - 1, index);

            // replace
            if (currentIndex !== index) {
                ids.splice(currentIndex, 1);
                ids.splice(index, 0, id);
            }
        }
        // append
        else {
            ids[totalIds++] = id;
        }

        // insert
        registry.set(id, item);
        this.onAdd(item, id, index);

        return this;
    },

    remove: function (item) {
        var index = this.indexOf(item);
        var ids = this.ids;
        var id;

        if (index !== -1) {
            id = ids[index];

            this.registry.unset(id);
            ids.splice(index, 1);

            this.onRemove(item, id, index);
        }

        return this;
    },

    indexOf: function (item) {
        var data = this.registry.data;
        var ids = this.ids;
        var found = -1;

        LIBCORE.each(data,
                    function (value, name) {
                        if (value === item) {
                           found = ids.indexOf(name);
                           return false;
                        }

                        return true;
                    },
                    true);

        return found;
    },

    exists: function (id) {
        if (!this.isValidId(id)) {
            throw new Error('Invalid item identifier.');
        }

        return this.registry.exists(id);
    },

    get: function (id) {
        if (!this.isValidId(id)) {
            throw new Error('Invalid item identifier.');
        }

        return this.registry.get(id);
    }
    
};


module.exports = {
    Class: Collection
};
