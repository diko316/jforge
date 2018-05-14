

var CHILD = require('./lib/child');
console.log('child is now running!');

// process.on('message', function (message) {
//     console.log('dawat! ', message);

//     process.exit(0);
// });

CHILD.prompt('What?')
    .then(function (answer) {
        console.log('answered: ', answer);
    });
