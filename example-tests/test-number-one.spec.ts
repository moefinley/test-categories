import {setup, test, testFixture} from "../src/test-categories";
import {exampleTestCategories} from "./example-test-categories";


namespace examples {
    @testFixture('some tests marked with various categories', [exampleTestCategories.commit])
    class exampleTestFixtureOne {
        public exampleProp: string;

        @setup
        createSomeScope() {
            this.exampleProp = "Hello";
        }

        @test('should read the scope', [exampleTestCategories.commit])
        scopeExample() {
            expect(this.exampleProp).toBe("Hello");
        }

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

        @test('should run async function')
        async exampleTestNumberFour() {
            await Promise.resolve();
            expect(true).toBe(true);
        }

        @test('should run async function passing done')
        exampleTestNumberFive(done:Function) {
            done();
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