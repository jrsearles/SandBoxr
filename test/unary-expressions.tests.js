var runner = require("./test-runner");
var expect = require("chai").expect;

/*
enum UnaryOperator {
    "-" | "+" | "!" | "~" | "typeof" | "void" | "delete"
}
*/

describe("Expressions", function () {
	describe("Unary Expressions", function () {
		it("should negate negative operators", function () {
			var result = runner.runBlock("-2;");
			expect(result.value).to.equal(-2);
		});

		it("should convert `+` operator to number", function () {
			var result = runner.runBlock("+2;");
			expect(result.value).to.equal(2);
		});

		it("should convert a '!' to a boolean", function () {
			var result = runner.runBlock("!{}");
			expect(result.value).to.be.a("boolean");
		});

		it("should convert a primitive wrapper object to appropriate boolean", function () {
			var result = runner.runBlock("!(new String())");
			expect(result.value).to.be.false;
		});

		it("should negate a boolean value", function () {
			var result = runner.runBlock("!false");
			expect(result.value).to.be.true;
		});
	});
});
