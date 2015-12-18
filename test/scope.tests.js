import {expect} from "chai";
import {es5 as runner} from "./test-runner";

describe("Scope", () => {
	describe("strict mode", () => {
		it("should detect 'use strict' literal and set scope to strict mode", done => {
			runner.getScope("'use strict';")
				.then(scope => {
					expect(scope.isStrict()).to.be.true;
					done();
				});
		});
	});

	describe("Global variables", () => {
		it("undefined exists", done => {
			runner.confirmBlock("typeof undefined==='undefined';", done);
		});

		it("Infinity exists", done => {
			runner.confirmBlock("typeof Infinity==='number';", done);
		});

		it("NaN exists", done => {
			runner.confirmBlock("NaN!==NaN;", done);
		});

		it("global this exists", done => {
			runner.confirmBlock("var x;'x' in this;", done);
		});

		it("`this` should refer to global object", done => {
			runner.confirmBlock("this.String === String", done);
		});

		it("a variable attached to global this is in the global", done => {
			runner.confirmBlock("this.foo = 2;this.foo === foo;", done);
		});

		it("should generate a reference error if variable does not exists", done => {
			runner.confirmError("foo;", ReferenceError, done);
		});

		it("should assign undeclared variable to global", done => {
			runner.confirmBlock("var obj = {};__ref = obj;__ref !== undefined;", done);
		});

		it("should create functions before they are called", done => {
			runner.confirmBlock("function f() { var x;return x;function x() {}\n}\ntypeof f() === 'function'", done);
		});

		it("should ignore debugger statements", done => {
			runner.confirmBlock("debugger;1==1;", done);
		});
	});
});
