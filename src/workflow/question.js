'use strict';


var LIBCORE = require('libcore');
var cli = require('../cli');

var object = LIBCORE.object;
var array = LIBCORE.array;
var string = LIBCORE.string;
var number = LIBCORE.number;
var method = LIBCORE.method;
var jsonFill = LIBCORE.jsonFill;

function Interogator(config) {
    this.questions = [];

    this.data = {};

    if (config) {
        this.setup(config);
    }
}

Interogator.prototype = {
    questions: null,
    constructor: Interogator,

    count: function () {
        return this.questions.length;
    },

    setup: function (config) {
        var isString = string;
        var isObject = object;
        var list = this.questions;
        var listLength = list.length;
        var item, c, length, question, property, transformer;
        

        if (isObject(config)) {
            config = [config];
        }

        if (array(config)) {
            for (c = 0, length = config.length; length--; c++) {
                item = config[c];
                if (isObject(item)) {
                    question = item.question;
                    property = item.property;
                    if (isString(question) && isString(property)) {
                        transformer = item.format;

                        list[listLength++] = {
                            question: question,
                            property: property,
                            format: method(transformer) ? transformer : null
                        };
                    }
                }
            }
        }

        return this;
    },

    ask: function (index, data) {
        var me = this;
        var P = Promise;
        var list = me.questions;
        var length = list.length;
        var item;

        if (!object(data)) {
            return P.reject(new Error('Invalid answer [data] parameter.'));
        }

        if (!number(index) || index < 0) {
            return P.reject(new Error('Invalid question [index] parameter.'));
        }

        if (!length || index > length - 1) {
            return P.reject(new Error('Question not found.'));
        }

        item = list[index];

        return cli.prompt(item.question)

                    .then(function (answer) {
                        var transform = item.format;

                        return transform ? transform(answer) : answer;

                    })

                    .then(function (answer) {
                        jsonFill(item.property,
                                me.data,
                                answer);
                        return answer;
                    });
    }
};

module.exports = Interogator;