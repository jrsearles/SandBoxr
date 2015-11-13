import {describe,it} from "mocha";
import {expect} from "chai";
import {SandBoxr} from "../";
import * as parser from "./ast-parser";

function createRunner (text) {
	return new SandBoxr(parser.parse(text), { parser: parser.parse });
}

describe("Eval", () => {
	it("should eval expression if parser is defined", done => {
		let ast = parser.parse("eval('1 + 1')===2;");
		let runner = new SandBoxr(ast, { parser: parser.parse });
		runner.execute().then(result => {
			expect(result.value).to.be.true;
			done();
		});
	});

	it("should be able to add variables to current scope", done => {
		let ast = parser.parse("eval('var i = 2;');i==2;");
		let runner = new SandBoxr(ast, { parser: parser.parse });
		runner.execute().then(result => {
			expect(result.value).to.be.true;
			done();
		});
	});

	describe("with Function constructor", () => {
		it("should return a function instance", done => {
			let runner = createRunner("typeof (new Function('return 1+2')) === 'function'");
			runner.execute().then(result => {
				expect(result.value).to.be.true;
				done();
			});
		});

		it("should execute parsed code when called", done => {
			let runner = createRunner("(new Function('return 1+2'))() === 3;");
			runner.execute().then(result => {
				expect(result.value).to.be.true;
				done();
			});
		});

		it("should allow arguments to be defined", done => {
			let runner = createRunner("(new Function('a', 'b', 'return a + b'))(1,2) === 3;");
			runner.execute().then(result => {
				expect(result.value).to.be.true;
				done();
			});
		});

		it("should run in the global scope", done => {
			let runner = createRunner("function a() { return new Function('return this;'); }\na()() === this;");
			runner.execute().then(result => {
				expect(result.value).to.be.true;
				done();
			});
		});

		it("should be able to call constructor with `call`", done => {
			let runner = createRunner("(Function.call(this, 'return 1+2;'))()==3;");
			runner.execute().then(result => {
				expect(result.value).to.be.true;
				done();
			});
		});
	});
});
