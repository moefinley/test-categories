import {testName} from "../src/test-categories";

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