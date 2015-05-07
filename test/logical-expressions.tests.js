var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Expressions", function () {
	describe("Logical", function () {
		it("should evaluate && as true if both sides are true", function () {
			var result = runner.runBlock("true && true;");
			expect(result.value).to.be.true;
		});

		it("should evaluate && as false if one side is false", function () {
			var result = runner.runBlock("true && false;");
			expect(result.value).to.be.false;
		});

		it("should evaluate && as false if both sides are false", function () {
			var result = runner.runBlock("false && false;");
			expect(result.value).to.be.false;
		});

		it("should evaluate || as false if both sides are false", function () {
			var result = runner.runBlock("false || false;");
			expect(result.value).to.be.false;
		});

		it("should evaluate || as true if one side is true", function () {
			var result = runner.runBlock("false || true;");
			expect(result.value).to.be.true;
		});

		it("should evaluate || as true if both sides are true", function () {
			var result = runner.runBlock("true || true;");
			expect(result.value).to.be.true;
		});
	});
});
