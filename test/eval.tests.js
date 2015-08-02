var expect = require("chai").expect;
var parser = require("./ast-parser");
var SandBoxr = require("../dist/sandboxr");

function createRunner (text) {
	return new SandBoxr(parser.parse(text), { parser: parser.parse });
}

describe("Eval", function () {
	it("should eval expression if parser is defined", function () {
		var ast = parser.parse("eval('1 + 1')===2;");
		var runner = new SandBoxr(ast, { parser: parser.parse });
		var result = runner.execute();

		expect(result.value).to.be.true;
	});

	it("should be able to add variables to current scope", function () {
		var ast = parser.parse("eval('var i = 2;');i==2;");
		var runner = new SandBoxr(ast, { parser: parser.parse });
		var result = runner.execute();

		expect(result.value).to.be.true;
	});

	describe("with Function constructor", function () {
		it("should return a function instance", function () {
			var runner = createRunner("typeof (new Function('return 1+2')) === 'function'");
			var result = runner.execute();

			expect(result.value).to.be.true;
		});

		it("should execute parsed code when called", function () {
			var runner = createRunner("(new Function('return 1+2'))() === 3;");
			var result = runner.execute();

			expect(result.value).to.be.true;
		});

		it("should allow arguments to be defined", function () {
			var runner = createRunner("(new Function('a', 'b', 'return a + b'))(1,2) === 3;");
			var result = runner.execute();

			expect(result.value).to.be.true;
		});

		it("should run in the global scope", function () {
			var runner = createRunner("function a() { return new Function('return this;'); }\na()() === this;");
			var result = runner.execute();

			expect(result.value).to.be.true;
		});

		it("should be able to call constructor with `call`", function () {
			var runner = createRunner("(Function.call(this, 'return 1+2;'))()==3;");
			var result = runner.execute();

			expect(result.value).to.be.true;
		});
	});
});
