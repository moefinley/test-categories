import {browser} from "protractor";

//  e.g. live: ['smoke', 'commit']
type environments = {
    [key: string]: string[];
}

type testCategoriesConfig = {
    environments: environments,
    currentEnvironment: string[],
    grepFlag: string
}

let config: testCategoriesConfig = {
    environments: null,
    currentEnvironment: null,
    grepFlag: null
};

function _checkTestTypesFromTestNameAreValid(testTypesFromTestName, testName) {
    //Check all the test types are valid to help avoid typos preventing tests running
    testTypesFromTestName.forEach(type => {
        let hasValidTypeNames: boolean = false;
        for (let environmentsKey in config.environments) {
            config.environments[environmentsKey].forEach(
                typeName => typeName === type ? hasValidTypeNames = true : null
            );
        }
        if (!hasValidTypeNames) {
            console.error(`Unknown test category "${type}" discovered in test "${testName.trim()}". This could be a typo in the test name or in the test-categories config.`);
        }
    });
}

export function testCategoriesSetup(_config: testCategoriesConfig) {
    Object.assign(config, _config);
}

export function testName(originalTestName: TemplateStringsArray) {
    config.currentEnvironment = config.environments[browser.params.environment];
    const regxResults: string[] = /\[(.*)](.*)/.exec(originalTestName[0]);
    let testTypesFromTestName = regxResults[1].split(',');
    testTypesFromTestName.forEach((testType, index) => testTypesFromTestName[index] = testType.trim());
    let testName = regxResults[2];

    _checkTestTypesFromTestNameAreValid(testTypesFromTestName, testName);

    let matchingTypes: string[] = [];

    config.currentEnvironment.forEach(
        environmentTestType => {
            matchingTypes = matchingTypes.concat(testTypesFromTestName.filter(
                testType => testType === environmentTestType
            ));
        }
    );

    if (matchingTypes.length >= 1) {
        testName = config.grepFlag + testName;
    }

    return testName;
}