'use strict';

function initialize() {
    console.log('running!');

    return Promise.reject(new Error('rejected daw'));
}

module.exports = initialize;