var runner = require("./test-runner");
var expect = require("chai").expect;

/*
enum BinaryOperator {
    "==" | "!=" | "===" | "!=="
         | "<" | "<=" | ">" | ">="
         | "<<" | ">>" | ">>>"
         | "+" | "-" | "*" | "/" | "%"
         | "|" | "^" | "&" | "in"
         | "instanceof" | ".."
}
*/

describe("Expressions", function () {
	describe("Binary Expressions", function () {
		var left = 1;
		var right = 2;

		var operators = [
			{ op:	"==", name: "Equals operator", expected: left == right },
			{ op:	"!=", name: "Not equals operator", expected: left != right },
			{ op:	"===", name: "Strict equals operator", expected: left === right },
			{ op:	"!==", name: "Strict not equals operator", expected: left !== right },
			{ op:	"<", name: "Less than operator", expected: left < right },
			{ op:	"<=", name: "Less than or equals operator", expected: left <= right },
			{ op:	">", name: "Greater than operator", expected: left > right },
			{ op:	">=", name: "Greater than or equals operator", expected: left >= right },
			{ op:	"<<", name: "Left shift operator", expected: left << right },
			{ op:	">>", name: "Right shift operator", expected: left >> right },
			{ op:	">>>", name: "Unsigned right shift operator", expected: left >>> right },
			{ op:	"+", name: "Addition operator", expected: left + right },
			{ op:	"-", name: "Subtraction operator", expected: left - right },
			{ op:	"*", name: "Multiply operator", expected: left * right },
			{ op:	"/", name: "Divide operator", expected: left / right },
			{ op:	"%", name: "Remainder operator", expected: left % right },
			{ op:	"|", name: "Bitwise AND operator", expected: left | right },
			{ op:	"^", name: "Bitwise XOR operator", expected: left ^ right },
			{ op:	"&", name: "Bitwise OR operator", expected: left & right }
		];

		operators.forEach(function (current) {
			it("should apply " + current.op, function() {
				var code = "" + left + " " + current.op + " " + right + ";";
	 			var result = runner.runBlock(code);

	 			expect(result.value).to.equal(current.expected);
			});
		});

		it("should show that a property is in the object if it is", function () {
			var result = runner.runBlock("var a = { foo: 1 };\n'foo' in a;");
			expect(result.value).to.be.true;
		});

		it("should show that a property is not in the object if it is not", function () {
			var result = runner.runBlock("var a = { foo: 1 };\n'bar' in a;");
			expect(result.value).to.be.false;
		});

		describe("Quirks", function () {
			it("should convert to string if either side is string", function () {
				var result = runner.runBlock("'1' + 2");
				expect(result.value).to.equal("12");

				result = runner.runBlock("1 + '2'");
				expect(result.value).to.equal("12");
			});

			it("should convert to number for subtraction operator", function () {
				var result = runner.runBlock("'1' - 2");
				expect(result.value).to.equal(-1);
			});
		});

		describe("instanceof", function () {
			it("should return true for an object", function () {
				var result = runner.runBlock("({} instanceof Object);");
				expect(result.value).to.be.true;
			});

			it("should return false for not an object", function () {
				var result = runner.runBlock("({} instanceof String);");
				expect(result.value).to.be.false;
			});

			it("should respect inheritance", function () {
				var result = runner.runBlock("function C(){}\nfunction D(){}\nD.prototype = new C();\nvar o = new D();(o instanceof C) && (o instanceof D);");
				expect(result.value).to.be.true;
			});

			it("should return true for primitive", function () {
				var result = runner.runBlock("'foo' instanceof String;");
				expect(result.value).to.be.true;
			});
		});
	});
});
