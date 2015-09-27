import {describe,it} from "mocha";
import * as runner from "./test-runner";

describe("Variables", () => {
	it("Should assign a variable to scope", done => {
		runner.confirmBlock("var a = 1;a==1;", done);
	});

	it("Should be unassigned for a variable that is not initialized", done => {
		runner.confirmBlock("var a;a===undefined;", done);
	});

	it("Should not add a property to an object during a check", done => {
		runner.confirmBlock("var a = {};if (a.notexist !== undefined) {}\n!('notexist' in a);", done);
	});
});
