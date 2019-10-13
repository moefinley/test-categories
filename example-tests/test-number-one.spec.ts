import {testName} from "../src/test-categories";

describe('some tests marked with various categories', () => {
    it(testName`[commit, acceptance, smoke] should run in local environment`, () => {
        expect(true).toBe(true);
    });
    it(testName`[acceptance,smoke] should not run in local environment`, () => {
        expect(true).toBe(true);
    });
    it(testName`[commit, unknown] should flag unknown category but still run in local environment`, () => {
        expect(true).toBe(true);
    });
});