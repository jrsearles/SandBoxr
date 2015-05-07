var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Switch Statement", function () {
	it("should execute the match block", function () {
		var scope = runner.getScope("var a = 5;switch(a) { case 5: a = 10; break; default: a = 1; break; }");
		expect(scope.getProperty("a").value).to.equal(10);
	});

	it("should execute default block if no matches", function () {
		var scope = runner.getScope("var a = 5;switch(a) { case 1: a = 10; break; default: a = 1; break; }");
		expect(scope.getProperty("a").value).to.equal(1);
	});

	it("should go to the next block if the case is empty", function () {
		var scope = runner.getScope("var a = 5;switch(a) { case 1: case 2: case 5: a = 1; break; default: a = 10; break; }");
		expect(scope.getProperty("a").value).to.equal(1);
	});

	it("should continue executing blocks if a passing block does not break", function () {
		var scope = runner.getScope("var a = 1;switch(a) { case 1: a = 2; case 2: a = 3; break; default: a = 4; break; }");
		expect(scope.getProperty("a").value).to.equal(3);
	});
});
