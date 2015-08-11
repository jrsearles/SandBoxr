var runner = require("./test-runner");

describe("Expressions", function () {
	describe("Logical", function () {
		it("should evaluate && as true if both sides are true", function (done) {
			runner.confirmBlock("true && true;", done);
		});

		it("should evaluate && as false if one side is false", function (done) {
			runner.confirmBlock("!(true && false);", done);
		});

		it("should evaluate && as false if both sides are false", function (done) {
			runner.confirmBlock("!(false && false);", done);
		});

		it("should evaluate || as false if both sides are false", function (done) {
			runner.confirmBlock("!(false || false);", done);
		});

		it("should evaluate || as true if one side is true", function (done) {
			runner.confirmBlock("false || true;", done);
		});

		it("should evaluate || as true if both sides are true", function (done) {
			runner.confirmBlock("true || true;", done);
		});
	});
});
