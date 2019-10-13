"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_categories_1 = require("../src/test-categories");
describe('some tests marked with various categories', () => {
    it(test_categories_1.testName `[commit, acceptance, smoke] should run`, () => {
        expect(true).toBe(true);
    });
    it(test_categories_1.testName `[acceptance,smoke] should not run`, () => {
        expect(true).toBe(true);
    });
    it(test_categories_1.testName `[commit, unknown] should flag unknown category but still run`, () => {
        expect(true).toBe(true);
    });
});
//# sourceMappingURL=test-number-one.spec.js.map