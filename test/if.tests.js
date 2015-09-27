import {describe,it} from "mocha";
import * as runner from "./test-runner";

describe("If", () => {
	it("should execute body when passing", done => {
		runner.confirmBlock("var a = 10;\nif (1 == 1) { a = 50; }\na==50;", done);
	});

	it("should not execute body when failing", done => {
		runner.confirmBlock("var a = 10;\nif (1 != 1) { a = 50; }\na==10;", done);
	});

	it("should not execute alternate when failing", done => {
		runner.confirmBlock("var a = 10;\nif (1 != 1) { a = 50; } else { a = 20; }\na==20;", done);
	});

	it("should evaluate true ternary expression", done => {
		runner.confirmBlock("true ? true : false;", done);
	});

	it("should evaluate false ternary expression", done => {
		runner.confirmBlock("false ? false : true;", done);
	});
});
