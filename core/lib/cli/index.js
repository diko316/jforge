'use strict';


var prompt = require('./prompt');
var options = require('./options');
var run = require('./run');
var events = require('./events');


module.exports = {
    prompt: prompt,
    arguments: options.create,
    run: run,
    on: events.on,
    off: events.off
};

