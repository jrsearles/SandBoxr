var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Variables", function () {
	it("Should assign a variable to scope", function () {
		var scope = runner.getScope("var a = 1;");
		var a = scope.getValue("a");
		expect(a.value).to.equal(1);
	});

	it("Should be unassigned for a variable that is not initialized", function () {
		var scope = runner.getScope("var a;");
		var a = scope.getValue("a");
		expect(a.value).to.be.undefined;
	});

	it("Should not add a property to an object during a check", function () {
		var result = runner.runBlock("var a = {};if (a.notexist !== undefined) {}\n!('notexist' in a);");
		expect(result.value).to.be.true;
	});
});
