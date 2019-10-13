//  e.g. live: ['smoke', 'commit']
type environments = {
    [key: string]: string[];
}

type testCategoriesConfig = {
    environments: environments,
    currentEnvironment: string,
    grepFlag: string
}

let config: testCategoriesConfig = {
    environments: null,
    currentEnvironment: null,
    grepFlag: null
};

function _validateConfig() {
    let rb: {propertyName: string, errorType: string};
    let types = {
        environments: "object",
        currentEnvironment: "string",
        grepFlag: "string"
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

function _checkCategoriesFromTestNameAreValid(categoriesFromTestName, testName) {
    //Check all the test types are valid to help avoid typos preventing tests running
    categoriesFromTestName.forEach(type => {
        let hasValidTypeNames: boolean = false;
        Object.getOwnPropertyNames(config.environments).forEach(function (environmentName) {
            config.environments[environmentName].forEach(
                typeName => typeName === type ? hasValidTypeNames = true : null
            );
        });
        if (!hasValidTypeNames) {
            console.error(`Unknown test category "${type}" discovered in test "${testName.trim()}". This could be a typo in the test name or in the test-categories config.`);
        }
    });
}

function _parseCategories(originalName: TemplateStringsArray): { name: string; categories: string[] } {
    const regxResults: string[] = /\[(.*)](.*)/.exec(originalName[0]);
    let categoriesFromTestName = regxResults[1].split(',');
    categoriesFromTestName.forEach((testType, index) => categoriesFromTestName[index] = testType.trim());
    let name = regxResults[2];
    return {
        name: name,
        categories: categoriesFromTestName
    }
}

function _getMatchingCategories(categories) {
    let matchingTypes: string[] = [];
    config.environments[config.currentEnvironment].forEach(
        environmentCategory => {
            matchingTypes = matchingTypes.concat(categories.filter(
                category => category === environmentCategory
            ));
        }
    );
    return matchingTypes;
}

export function testCategoriesSetup(_config: testCategoriesConfig) {
    Object.assign(config, _config);
}

export function testName(originalTestName: TemplateStringsArray) {
    let name: string, categories: string[];

    if (_validateConfig()) {
        ({name, categories} = _parseCategories(originalTestName));
        _checkCategoriesFromTestNameAreValid(categories, name);

        if (_getMatchingCategories(categories).length >= 1) {
            name = config.grepFlag + name;
        }
    } else {
        name = 'ERROR PARSING CATEGORIES:' + originalTestName;
    }

    return name;
}
