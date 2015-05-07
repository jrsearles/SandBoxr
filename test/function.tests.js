var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Functions", function () {
	it("should return a value from a named function", function () {
		var result = runner.runBlock("function a() { return 50; }\na();");
		expect(result.value).to.equal(50);
	});

	it("should return a value from a function assigned to variable", function () {
		var result = runner.runBlock("var a = function () { return 50; };\na();");
		expect(result.value).to.equal(50);
	});

	it("should pass parameters into function", function () {
		var result = runner.runBlock("var a = function (b) { return b; };\na(50);");
		expect(result.value).to.equal(50);
	});

	it("should be able to access variable in outer scope", function () {
		var result = runner.runBlock("var a = 50;\nfunction b() { return a; }\nb();");
		expect(result.value).to.equal(50);
	});
});
