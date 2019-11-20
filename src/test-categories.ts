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
    let errorMessage = null;
    let types = {
        environments: "object",
        currentEnvironment: "string",
        grepFlag: "string"
    };
    Object.getOwnPropertyNames(config).forEach(
        propertyName => {
            let type = typeof config[propertyName];

            if (type !== types[propertyName]) {
                errorMessage = `!!!!!!!! Error in test-categories config. ${propertyName} is null !!!!!!!!!`;
            }
            if(type === "string" && config[propertyName].lenght < 1){
                errorMessage = `!!!!!!!! Error in test-categories config. ${propertyName} is empty string`
            }

        }
    );

    if(!config.environments.hasOwnProperty(config.currentEnvironment)) {
        errorMessage = `Current environment "${config.currentEnvironment}" doesn't match any environments`
    }

    if (errorMessage !== null) {
        console.error(errorMessage);
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

export var enabled = false;

export function testCategoriesSetup(_config: testCategoriesConfig) {
    enabled = true;
    Object.assign(config, _config);
}

export function testName(originalTestName: TemplateStringsArray) {
    let name: string, categories: string[];

    // If testCategoriesSetup has not been run or if `enabled` has manually been set to false just return
    // the original name
    if(!enabled) return originalTestName[0];

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
