import {test, testFixture} from "../src/test-categories";
import {exampleTestCategories} from "./example-test-categories";

namespace examples {
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

    @testFixture('A fixture that should not run in local', [exampleTestCategories.smoke])
    class exampleTestFixtureTwo {

        @test('should not run', [exampleTestCategories.commit])
        exampleTestNumberOne() {
            expect(true).toBe(true);
        }

        @test('should not run', [exampleTestCategories.smoke])
        exampleTestNumberTwo() {
            expect(true).toBe(true);
        }

        @test('should not run')
        exampleTestNumberThree() {
            expect(true).toBe(true);
        }
    }
}