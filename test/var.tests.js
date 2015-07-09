var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Variables", function () {
	it("Should assign a variable to scope", function () {
		var result = runner.runBlock("var a = 1;a==1;");
		expect(result.value).to.be.true;
	});

	it("Should be unassigned for a variable that is not initialized", function () {
		var result = runner.runBlock("var a;a===undefined;");
		expect(result.value).to.be.true;
	});

	it("Should not add a property to an object during a check", function () {
		var result = runner.runBlock("var a = {};if (a.notexist !== undefined) {}\n!('notexist' in a);");
		expect(result.value).to.be.true;
	});
});
