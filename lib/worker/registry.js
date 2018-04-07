'use strict';

var LIBCORE = require('libcore');
var Base = require('./base');

var REGISTRY = LIBCORE.createRegistry();
var LIST = [];
var method = LIBCORE.method;
var string = LIBCORE.string;
var PRE_RUNNER_RE = /^pre.+$/;
var POST_RUNNER_RE = /^post.+$/;

function register(name, runner) {
    var registry = REGISTRY;
    var list = LIST;

    if (!string(name)) {
        throw new Error('Invalid worker [name] to register.');
    }

    if (!method(runner)) {
        throw new Error('Invalid worker [runner] to register.');
    }

    if (registry.exists(name)) {
        throw new Error('Overriding runner [' + name + '] is not allowed.');
    }

    if (!PRE_RUNNER_RE.test(name) && !POST_RUNNER_RE.test(name)) {
        list[list.length] = name;    
    }

    registry.set(name, runner);
}

function get(name) {
    var registry = REGISTRY;
    var pre, post;

    if (string(name) && registry.exists(name)) {
        pre = 'pre' + name;
        post = 'post' + name;

        return [
            registry.exists(pre) ? registry.get(pre) : null,
            registry.get(name),
            registry.exists(post) ? registry.get(post) : null
        ];
    }

    return null;
}

module.exports = {
    get: get,
    register: register
};
