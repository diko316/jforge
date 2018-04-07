'use strict';

var commando = require('./lib/cli');
var workflow = require('./lib/workflow');

console.log('workflow init ? ', workflow.moduleExist('libcore'));
console.log(commando.arguments({
    'b': 1
}));
