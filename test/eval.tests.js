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
});
