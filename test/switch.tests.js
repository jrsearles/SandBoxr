var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Switch Statement", function () {
	it("should execute the match block", function () {
		var result = runner.runBlock("var a = 5;switch(a) { case 5: a = 10; break; default: a = 1; break; }\na==10;");
		expect(result.value).to.be.true;
	});

	it("should execute default block if no matches", function () {
		var result = runner.runBlock("var a = 5;switch(a) { case 1: a = 10; break; default: a = 1; break; }\na==1;");
		expect(result.value).to.be.true;
	});

	it("should go to the next block if the case is empty", function () {
		var result = runner.runBlock("var a = 5;switch(a) { case 1: case 2: case 5: a = 1; break; default: a = 10; break; }\na==1;");
		expect(result.value).to.be.true;
	});

	it("should continue executing blocks if a passing block does not break", function () {
		var result = runner.runBlock("var a = 1;switch(a) { case 1: a = 2; case 2: a = 3; break; default: a = 4; break; }\na==3;");
		expect(result.value).to.be.true;
	});

	it("should allow return to break out of a switch", function () {
		var code = "function a(value) { switch (value) { case 1: return true; default: return false; } }\na(1)";
		var result = runner.runBlock(code);
		expect(result.value).to.be.true;
	});
});
