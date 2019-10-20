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
    function _runTestsDefinedInDescribe(constructor: Function) {
        Object.getOwnPropertyNames(constructor.prototype).forEach(testMethod => {
            if (testMethod != "name" && testMethod != "constructor")
                constructor.prototype[testMethod]();
        });
    }

    return function (constructor: Function) {
        constructor.prototype.name = fixtureName;
        if (!_validateConfig()) return;

        let matchedCategories = _matchCategories(categories);
        if (matchedCategories.length > 0) {
            describe(fixtureName, () => {
                _runTestsDefinedInDescribe.call(this,constructor);
            });
        } else {
            xdescribe(fixtureName, () => {
                _runTestsDefinedInDescribe.call(this,constructor);
            });
        }
    }
}

export function test<T>(testName: string, categories?: T[]) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalTestFunction = descriptor.value;
        if (_validateConfig()) {
            if (typeof categories == "undefined" || _matchCategories(categories).length > 0) {
                descriptor.value = () => {
                    it(testName, originalTestFunction);
                }
            } else {
                descriptor.value = () => {
                    xit(testName, originalTestFunction);
                }
            }
        }
    }
}