var runner = require("./test-runner");
var expect = require("chai").expect;

describe("If", function () {
	it("should execute body when passing", function () {
		var scope = runner.getScope("var a = 10;\nif (1 == 1) { a = 50; }");
		expect(scope.getProperty("a").value).to.equal(50);
	});

	it("should not execute body when failing", function () {
		var scope = runner.getScope("var a = 10;\nif (1 != 1) { a = 50; }");
		expect(scope.getProperty("a").value).to.equal(10);
	});

	it("should not execute alternate when failing", function () {
		var scope = runner.getScope("var a = 10;\nif (1 != 1) { a = 50; } else { a = 20; }");
		expect(scope.getProperty("a").value).to.equal(20);
	});

	it("should evaluate true ternary expression", function () {
		var result = runner.runBlock("true ? 1 : 0");
		expect(result.value).to.equal(1);
	});

	it("should evaluate false ternary expression", function () {
		var result = runner.runBlock("false ? 1 : 0");
		expect(result.value).to.equal(0);
	});
});
