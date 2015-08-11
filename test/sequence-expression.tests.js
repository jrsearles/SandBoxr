var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Expressions", function () {
	describe("Sequence", function () {
		it("should assign to last value in sequence", function (done) {
			runner.confirmBlock("var a = (7, 5);a===5;", done);
		});
	});
});
