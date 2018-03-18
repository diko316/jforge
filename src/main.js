'use strict';

var CLI = require('./cli');

var config = CLI.arguments({
    '-test': 0
});

console.log('current: ', process.cwd());

console.log('config ', config);

// CLI.prompt('buang! ')
//     .then(function (output) {
//         console.log('what? ', output);
//     });

// CLI.exec('which docker')
//         .then(function (output) {
//             console.log(output);
//         })
//         .catch(function (error) {
//             console.log('error!');
//             console.error(error);
//         });
// console.log('x86_64-w64-mingw32');
