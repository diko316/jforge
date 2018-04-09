'use strict';

var LIBCORE = require('libcore');
var OBJECT = require('../object');
var FileClass = require('../file');

var string = LIBCORE.string;
var FileCollection;

FileCollection = OBJECT.extend(OBJECT.Collection, function (Base, Constructor) {

    return {
        createItem: function (fileReference) {
            var Class = FileClass;

            fileReference = Base.createItem.call(fileReference);

            if (string(fileReference)) {
                fileReference = new Class(fileReference);
            }

            if (!(fileReference instanceof Class)) {
                throw new Error('Invalid [fileReference] parameter.');
            }

            return fileReference;
        }
    };
});

module.exports = FileCollection;