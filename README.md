# Test Categories for Jasmin and Mocha

This module allows you to add category names to Jasmine or Mocha tests and configure which categories run in each environment.

```javascript
@test('should run in local environment', [exampleTestCategories.commit])
exampleTestNumberOne() {
    expect(true).toBe(true);
}
```

It allows you to add categories to tests and test fixtures (e.g. describe) and uses the `xdescribe` and `xit` to disable
 the tests ensuring reporting is correct.

Start by configuring all the environments you have, adding the categories you want to run under each environment.
 Then attach one or many categories to each test. 

## Getting Started

###Step 1
Add the environment and category configuration to your tests. 

Here we add it at the top of our Protractor configuration but you can add the same to a single test spec file or
 anything that will run before your tests.

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
                local: [exampleTestCategories.commit],
                systest: [exampleTestCategories.smoke, exampleTestCategories.acceptance],
                live: [exampleTestCategories.smoke]
            },
            //Here we set the current environment using Protractor's params but it just needs to be a
            //string that matches an environments key (i.e. 'local') and can come from anywhere.
            currentEnvironment: browser.params.environment,
        });
    }
};
```

###Step 2
Then we define our tests as methods in a class and attach the `@testFixture` or `@test` decorator.
```javascript
@testFixture('some tests marked with various categories', [exampleTestCategories.commit])
class exampleTestFixtureOne {

    @test('should run in local environment', [exampleTestCategories.commit])
    exampleTestNumberOne() {
        expect(true).toBe(true);
    }

    @test('should not run in local environment', [exampleTestCategories.smoke])
    exampleTestNumberTwo() {
        expect(true).toBe(true);
    }

    @test('should run anywhere')
    exampleTestNumberThree() {
        expect(true).toBe(true);
    }
}
``` 

Finally we run our tests. In this example we use Protractor passing in the environment as a param.
```shell script
protractor myconfig.js --grep @@@ --params.environment=local
```

### Prerequisites

This module should work with any test framework that has the same test methods as Jasmine (e.g. `describe`, `it`, `xdescribe` and `xit`)

### Installing

```
npm install test-categories
```

### Config
- *environments*: An object containing all the environments and their associated categories.
 The keys are the environment names and the value is an array of objects that are later compared (we recommend using enums). 
- *currentEnvironment*: The name of the current environment you are running the tests in.
 As you are likely to run the same spec file in multiple environments it is best to pass this in from the command line
 i.e. browser.params.myEnvironment if you were using Protractor.
```
{
    environments: {
        [key: string]: any[]
    },
    currentEnvironment: string
}
```

### Running the example

There is an example in the `example-tests` folder. To run it download the source, do `npm install` and then 

```shell script
npm run example-tests
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/moefinley/test-categories/tags). 

## License

This project is licensed under the MIT License - see [choosealicense.com/licenses/mit/](https://choosealicense.com/licenses/mit/) file for details
