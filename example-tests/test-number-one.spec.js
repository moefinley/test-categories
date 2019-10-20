"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_categories_1 = require("../src/test-categories");
const example_test_categories_1 = require("./example-test-categories");
var examples;
(function (examples) {
    let exampleTestFixtureOne = class exampleTestFixtureOne {
        exampleTestNumberOne() {
            expect(true).toBe(true);
        }
        exampleTestNumberTwo() {
            expect(true).toBe(true);
        }
        exampleTestNumberThree() {
            expect(true).toBe(true);
        }
    };
    __decorate([
        test_categories_1.test('should run in local environment', [example_test_categories_1.exampleTestCategories.commit])
    ], exampleTestFixtureOne.prototype, "exampleTestNumberOne", null);
    __decorate([
        test_categories_1.test('should not run in local environment', [example_test_categories_1.exampleTestCategories.smoke])
    ], exampleTestFixtureOne.prototype, "exampleTestNumberTwo", null);
    __decorate([
        test_categories_1.test('should run anywhere')
    ], exampleTestFixtureOne.prototype, "exampleTestNumberThree", null);
    exampleTestFixtureOne = __decorate([
        test_categories_1.testFixture('some tests marked with various categories', [example_test_categories_1.exampleTestCategories.commit])
    ], exampleTestFixtureOne);
    let exampleTestFixtureTwo = class exampleTestFixtureTwo {
        exampleTestNumberOne() {
            expect(true).toBe(true);
        }
        exampleTestNumberTwo() {
            expect(true).toBe(true);
        }
        exampleTestNumberThree() {
            expect(true).toBe(true);
        }
    };
    __decorate([
        test_categories_1.test('should not run', [example_test_categories_1.exampleTestCategories.commit])
    ], exampleTestFixtureTwo.prototype, "exampleTestNumberOne", null);
    __decorate([
        test_categories_1.test('should not run', [example_test_categories_1.exampleTestCategories.smoke])
    ], exampleTestFixtureTwo.prototype, "exampleTestNumberTwo", null);
    __decorate([
        test_categories_1.test('should not run')
    ], exampleTestFixtureTwo.prototype, "exampleTestNumberThree", null);
    exampleTestFixtureTwo = __decorate([
        test_categories_1.testFixture('A fixture that should not run in local', [example_test_categories_1.exampleTestCategories.smoke])
    ], exampleTestFixtureTwo);
})(examples || (examples = {}));
//# sourceMappingURL=test-number-one.spec.js.map