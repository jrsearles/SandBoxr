var expect = require("chai").expect;
var acorn = require("acorn");
var SandBoxr = require("../src/sandboxr");

describe("Eval", function () {
	it("should eval expression if parser is defined", function () {
		var ast = acorn.parse("eval('1 + 1');");
		var runner = new SandBoxr(ast, { parser: acorn.parse });
		var result = runner.execute();

		expect(result.result.value).to.equal(2);
	});

	it("should be able to add variables to current scope", function () {
		var ast = acorn.parse("eval('var i = 2;');i;");
		var runner = new SandBoxr(ast, { parser: acorn.parse });
		var result = runner.execute();

		expect(result.result.value).to.equal(2);
	});
});
