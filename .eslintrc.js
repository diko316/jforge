module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:es5/no-es2015",
        "plugin:es5/no-es2016"
    ],
    "env": {
        "node": true
    },
    "rules": {
        "no-console": 0
    },
    "globals": {
        "Promise": true
    }
};
