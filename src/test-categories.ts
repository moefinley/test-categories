type environments = {
    [key: string]: any[];
}

type testCategoriesConfig = {
    environments: environments,
    currentEnvironment: string
}

let config: testCategoriesConfig = {
    environments: null,
    currentEnvironment: null
};

enum testTypes {
    setup,
    fixture,
    test
}

function _validateConfig() {
    let rb: { propertyName: string, errorType: string };
    let types = {
        environments: "object",
        currentEnvironment: "string"
    };
    Object.getOwnPropertyNames(config).forEach(
        propertyName => {
            let type = typeof config[propertyName];
            if (type !== types[propertyName]) {
                rb.propertyName = propertyName;
                rb.errorType = type;
            }
        }
    );

    if (typeof rb != "undefined") {
        console.error(`!!!!!!!! Error in test-categories config. ${rb} is null !!!!!!!!!`);
        return false;
    } else {
        return true;
    }
}


export function testCategoriesSetup(_config: testCategoriesConfig) {
    Object.assign(config, _config);
}

function _matchCategories<T>(categories: T[]) {
    let configCategories = config.environments[config.currentEnvironment];
    return categories.filter(category => configCategories.includes(category));
}

export function testFixture<T>(fixtureName: string, categories: T[]) {
    function _runSetupDefinedInDescribe(testFixtureInstance: any) {
        Object.getOwnPropertyNames(testFixtureInstance.prototype).forEach(testMethod => {
            if (testFixtureInstance[testMethod].___testType === testTypes.setup && typeof testFixtureInstance[testMethod] === "function")
                testFixtureInstance[testMethod].apply(testFixtureInstance);
        });
    }

    function _runTestsDefinedInDescribe(testFixtureInstance: Function) {
        Object.getOwnPropertyNames(testFixtureInstance.prototype).forEach(testMethod => {
            if (testFixtureInstance[testMethod].___testType === testTypes.test && typeof testFixtureInstance[testMethod] === "function")
                testFixtureInstance[testMethod].apply(testFixtureInstance);
        });
    }

    return function (target: any) {

        let testFixtureInstance = new target();
        testFixtureInstance.prototype = target.prototype;
        testFixtureInstance.name = fixtureName;
        if (!_validateConfig()) return;

        let matchedCategories = _matchCategories(categories);
        if (matchedCategories.length > 0) {
            describe(fixtureName, function () {
                _runSetupDefinedInDescribe.call(testFixtureInstance, testFixtureInstance);
                _runTestsDefinedInDescribe.call(testFixtureInstance, testFixtureInstance);
            });
        } else {
            xdescribe(fixtureName, function() {
                _runSetupDefinedInDescribe.call(testFixtureInstance, testFixtureInstance);
                _runTestsDefinedInDescribe.call(testFixtureInstance, testFixtureInstance);
            });
        }
    }
}

export function test<T>(testName: string, categories?: T[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalTestFunction = descriptor.value;
        if (_validateConfig()) {
            if (typeof categories == "undefined" || _matchCategories(categories).length > 0) {
                descriptor.value = function() {
                    //TODO: Make the scope correct
                    it(testName, originalTestFunction);
                };
                descriptor.value.___testType = testTypes.test;
            } else {
                descriptor.value = function() {
                    xit(testName, originalTestFunction);
                };
                descriptor.value.___testType = testTypes.test;
            }
        }
    }
}


export function setup(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value.___testType = testTypes.setup;
}