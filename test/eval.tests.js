var expect = require("chai").expect;
var parser = require("./ast-parser");
var SandBoxr = require("../dist/sandboxr");

function createRunner (text) {
	return new SandBoxr(parser.parse(text), { parser: parser.parse });
}

describe("Eval", function () {
	it("should eval expression if parser is defined", function (done) {
		var ast = parser.parse("eval('1 + 1')===2;");
		var runner = new SandBoxr(ast, { parser: parser.parse });
		runner.execute().then(function (result) {
			expect(result.value).to.be.true;
			done();
		});
	});

	it("should be able to add variables to current scope", function (done) {
		var ast = parser.parse("eval('var i = 2;');i==2;");
		var runner = new SandBoxr(ast, { parser: parser.parse });
		runner.execute().then(function (result) {
			expect(result.value).to.be.true;
			done();
		});
	});

	describe("with Function constructor", function () {
		it("should return a function instance", function (done) {
			var runner = createRunner("typeof (new Function('return 1+2')) === 'function'");
			runner.execute().then(function (result) {
				expect(result.value).to.be.true;
				done();
			});
		});

		it("should execute parsed code when called", function (done) {
			var runner = createRunner("(new Function('return 1+2'))() === 3;");
			runner.execute().then(function (result) {
				expect(result.value).to.be.true;
				done();
			});
		});

		it("should allow arguments to be defined", function (done) {
			var runner = createRunner("(new Function('a', 'b', 'return a + b'))(1,2) === 3;");
			runner.execute().then(function (result) {
				expect(result.value).to.be.true;
				done();
			});
		});

		it("should run in the global scope", function (done) {
			var runner = createRunner("function a() { return new Function('return this;'); }\na()() === this;");
			runner.execute().then(function (result) {
				expect(result.value).to.be.true;
				done();
			});
		});

		it("should be able to call constructor with `call`", function (done) {
			var runner = createRunner("(Function.call(this, 'return 1+2;'))()==3;");
			runner.execute().then(function (result) {
				expect(result.value).to.be.true;
				done();
			});
		});
	});
});
