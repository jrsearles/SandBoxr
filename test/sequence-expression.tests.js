var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Expressions", function () {
	describe("Sequence", function () {
		var scope = runner.getScope("var a = (7, 5);");
		expect(scope.getProperty("a").value).to.equal(5);
	});
});
