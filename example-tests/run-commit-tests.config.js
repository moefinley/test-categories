var jasmineReporters = require('jasmine-reporters');
var testCategoriesSetup = require('../src/test-categories').testCategoriesSetup;

testCategoriesSetup({
    environments: {
        local: ['commit'],
        systest: ['acceptance'],
        live: ['smoke']
    },
    grepFlag: '@@@'
});

//protractor ... --params.environment=local

exports.config = {
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        browserName: 'chrome'
    },

    // Spec patterns are relative to the configuration file location passed
    // to protractor (in this example conf.js).
    // They may include glob patterns.
    specs: ['*.spec.js'],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        verbose: true
    },
    framework: 'jasmine2',
    onPrepare: function() {
        jasmine.getEnv().addReporter(new jasmineReporters.TerminalReporter({
            verbosity: 3,
            color: true,
            showStack: true
        }));
    }
};