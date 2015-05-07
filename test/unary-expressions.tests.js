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
	});
});
