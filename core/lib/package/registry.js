'use strict';

var LIB = require('libcore');

var string = LIB.string;
var trim = LIB.trim;
var contains = LIB.contains;
var REGISTRY = LIB.createRegistry();
var PACKAGE_NAME_RE = /^([^\@]+)(\@(.+))?$/;


function parse(name) {
    var match, parts;

    if (string(name)) {
        match = trim(name).match(PACKAGE_NAME_RE);

        if (match) {
            parts = [match[1]];

            if (match[2]) {
                parts[1] = match[3];
            }

            return parts;
        }
    }

    return null;
}

function register(name) {
    var list = REGISTRY;
    var parsed = parse(name);
    var name;

    if (parsed) {
        name = parsed[0];

        // not yet registered
        if (!list.exists(name)) {
            list.set(
                name,
                {
                    name: name,
                    location: parsed.length === 2 ? parsed[1] : 0,
                    resolved: null
                }
            );
        }

        return name;
    }

    return null;
}

function isRegistered(name) {
    var parsed = parse(name);

    if (parsed) {
        return REGISTRY.exists(parsed[0]);
    }

    return false;
}

function resolve(name, refresh) {
    var parsed = parse(name);
    var cache = require.cache;
    var packageName, resolved, definition;

    if (parsed) {
        packageName = parsed[0];

        // register if not yet registered
        if (!isRegistered(packageName)) {
            register(name);
        }

        definition = REGISTRY.get(packageName);

        if (refresh === true || definition.resolved === null) {
            if (contains(cache, packageName)) {
                delete cache[packageName];
            }

            try {
                definition.resolved = require.resolve(packageName);
            }
            catch (error) {
                // do nothing
            }
        }

        return definition.resolved;
    }

    return false;
}

module.exports = {
    parse: parse,
    isRegistered: isRegistered,
    resolve: resolve
};
