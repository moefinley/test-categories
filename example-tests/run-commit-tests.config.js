"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protractor_1 = require("protractor");
const example_test_categories_1 = require("./example-test-categories");
var jasmineReporters = require('jasmine-reporters');
var testCategoriesSetup = require('../src/test-categories').testCategoriesSetup;
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
        showColors: true,
        verbose: true
    },
    framework: 'jasmine2',
    onPrepare: function () {
        testCategoriesSetup({
            environments: {
                local: [example_test_categories_1.exampleTestCategories.commit],
                systest: [example_test_categories_1.exampleTestCategories.smoke, example_test_categories_1.exampleTestCategories.acceptance],
                live: [example_test_categories_1.exampleTestCategories.smoke]
            },
            currentEnvironment: protractor_1.browser.params.environment
        });
        jasmine.getEnv().addReporter(new jasmineReporters.TerminalReporter({
            verbosity: 3,
            color: true,
            showStack: true
        }));
    }
};
//# sourceMappingURL=run-commit-tests.config.js.map