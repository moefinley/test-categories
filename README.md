# Test Categories for Jasmin and Mocha

Add category names to Jasmine or Mocha tests and define which category or categories run in each environment.

```javascript
it(testName`[commit, acceptance, smoke] should run under three different categories`)
```

It's more flexible than grouping testing in spec files and it provides error checking (typos in category names) that is missing when using `--grep` test name matching.

Define as many environments as you like then attach multiple categories to those environments. The attach multiple categories to each test.
If a test's category does not match any environment's category a warning is displayed, helping to show typos.

## Getting Started

Add category configuration to your tests. Here we add it at the top of our Protractor configuration but you can add the same to a single test spec file or anything that will run before your tests.

```javascript
var testCategoriesSetup = require('test-categories').testCategoriesSetup;

exports.config = {
    capabilities: {
        browserName: 'chrome'
    },
    specs: ['*.spec.js'],
    onPrepare: function() {
        //In Protractor we can run `testCategoriesSetup` in the onPrepare
        testCategoriesSetup({
            environments: {
                    local: ['commit'],
                    systest: ['smoke','acceptance'],
                    live: ['smoke']
                },
            currentEnvironment: browser.params.environment, //Sets the current environment via Protractor's params
            grepFlag: '@@@' //This is a string we will prefix to all the tests we want to run
        });
    }
};
```

Then we add the template literal tag to any of the tests we want to give categories.
```javascript
import {testName} from "test-categories";

describe('some tests marked with various categories', () => {
    it(testName`[commit, acceptance, smoke] should run`, () => {
        expect(true).toBe(true);
    });
    it(testName`[acceptance,smoke] should not run`, () => {
        expect(true).toBe(true);
    });
    it(testName`[commit, unknown] should flag unknown category but still run`, () => {
        expect(true).toBe(true);
    });
});
``` 

Finally we run our tests passing the `grepFlag` to the `--grep` argument of Jasmine Node, Mocha or in this example Protractor.
```shell script
protractor myconfig.js --grep @@@ --params.environment=local
```

### Prerequisites

This library will work with any test framework the uses strings as test name and can disabled tests via string matching (i.e. grep, regex).

### Installing

```
npm install test-categories
```

### Config
- *environments*: An object containing all the environments you want to be able to run test categories within.
 The keys are the environment names and the value an array strings that are categories. 
 You must list all the environments\categories you use so the library can check for errors.
 If you have multiple spec files it is best you share this in a module. 
- *currentEnvironment*: The name of the current environment you are running the tests in.
 As you are likely to run the same spec file in multiple environments it is best to pass this in from the command line
 i.e. browser.params.myEnvironment if you were using Protractor.
- *grepFlag*: This string will be prefixed to all test names that should be run. It's will be visible in your tests reports.
 So it's best to keep it short.
```
{
    environments: {
        [key: string]: string[]
    },
    currentEnvironment: string,
    grepFlag: string
}
```

### Running the example

The is an example in the `example-tests` folder. To run it download the source, do `npm install` and then 

```shell script
npm run example-tests
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## License

This project is licensed under the MIT License - see [choosealicense.com/licenses/mit/](https://choosealicense.com/licenses/mit/) file for details
