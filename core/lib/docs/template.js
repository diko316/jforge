'use strict';

var LIBCORE = require('libcore');
var object = LIBCORE.object;
var string = LIBCORE.string;
var number = LIBCORE.number;

var FUN = Function;
var EVALUATORS = LIBCORE.createRegistry();
var TAG_RE = /\{\{([a-z0-9\[\]_\-\"\' \t\r\n]*)\}\}/gi;
var TRIM_RE = /^\s+|\s+$/g;

function transform(path, params) {
    var list = EVALUATORS;
    var value;

    if (!list.exists(path)) {
        list.set(
            path,
            new FUN(
                'params',
                'try { return params.' + path + '; } catch(e) {}'
            )
        );
    }

    value = list.get(path)(params);

    return number(value) ? 1 * value :
                string(value) ? value : '';
}


function apply(text, params) {
    if (string(text)) {
        if (!object(params)) {
            params = {};
        }

        return text.replace(
                    TAG_RE,
                    function (all, matched) {
                        return transform(
                                matched.replace(TRIM_RE, ''),
                                params
                            );
                    }
                );
    }

    return null;
}

module.exports = {
    apply: apply
};
