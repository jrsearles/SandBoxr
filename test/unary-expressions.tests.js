var runner = require("./test-runner");
var expect = require("chai").expect;

/*
enum UnaryOperator {
    "-" | "+" | "!" | "~" | "typeof" | "void" | "delete"
}
*/

describe("Expressions", function () {
	describe("Unary Expressions", function () {
		it("should return `undefined` for undefined variable", function () {
			var result = runner.runBlock("typeof a === 'undefined';");
			expect(result.value).to.be.true;
		});

		it("should return `undefined` for undefined property", function () {
			var result = runner.runBlock("var a = {};typeof a.foo === 'undefined';");
			expect(result.value).to.be.true;
		});

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

		describe("delete", function () {
			it("should be true for non-reference", function () {
				var result = runner.runBlock("delete 42;");
				expect(result.value).to.be.true;
			});

			it("should return true for non-existent variable", function () {
				var result = runner.runBlock("delete a;");
				expect(result.value).to.be.true;
			});

			it("should return false when deleting non-configurable property", function () {
				var result = runner.runBlock("delete NaN;");
				expect(result.value).to.be.false;
			});

			it("should not delete a variable", function () {
				var result = runner.runBlock("var a = [];var d = delete a;d === false && Array.isArray(a);");
				expect(result.value).to.be.true;
			});

			it("should throw a reference error if object doesn't exists", function () {
				expect(function () {
					runner.runBlock("delete o.a;");
				}).to.throw(ReferenceError);
			});
		});
	});
});
