var OPTIONS = require('./options');
var RUNTIME_ARGUMENTS = ['node', 'cli.js'];

describe('Process CLI options', function () {

    beforeEach(function () {
        process.argv = RUNTIME_ARGUMENTS.concat([
            '--test-option',
            'option-arg',
            '-a',
            'arg1',
            'arg2'
        ]);
    });

    it('Should create initial options object.', function () {
        var Class = OPTIONS.Class;
        var instance = new Class();
        var result;

        result = instance.options(
                    // option settings
                    {
                        '-test-option': 1,
                        'a': 0
                    },
                    // arguments before options
                    0,
                    // arguments after options
                    1);
        
        expect(result.option('-test-option')).to.be('option-arg');
        expect(result.option('a')).to.be(true);


    });
});
