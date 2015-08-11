var runner = require("./test-runner");

describe("Switch Statement", function () {
	it("should execute the match block", function (done) {
		runner.confirmBlock("var a = 5;switch(a) { case 5: a = 10; break; default: a = 1; break; }\na==10;", done);
	});

	it("should execute default block if no matches", function (done) {
		runner.confirmBlock("var a = 5;switch(a) { case 1: a = 10; break; default: a = 1; break; }\na==1;", done);
	});

	it("should go to the next block if the case is empty", function (done) {
		runner.confirmBlock("var a = 5;switch(a) { case 1: case 2: case 5: a = 1; break; default: a = 10; break; }\na==1;", done);
	});

	it("should continue executing blocks if a passing block does not break", function (done) {
		runner.confirmBlock("var a = 1;switch(a) { case 1: a = 2; case 2: a = 3; break; default: a = 4; break; }\na==3;", done);
	});

	it("should allow return to break out of a switch", function (done) {
		var code = "function a(value) { switch (value) { case 1: return true; default: return false; } }\na(1)";
		runner.confirmBlock(code, done);
	});
});
