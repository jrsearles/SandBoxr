var runner = require("./test-runner");

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
			it("should apply " + current.op, function(done) {
				var code = "(" + left + " " + current.op + " " + right + ") === (" + current.expected + ");";
	 			runner.confirmBlock(code, done);
			});
		});

		it("should show that a property is in the object if it is", function (done) {
			runner.confirmBlock("var a = { foo: 1 };\n'foo' in a;", done);
		});

		it("should show that a property is not in the object if it is not", function (done) {
			runner.confirmBlock("var a = { foo: 1 };\n!('bar' in a);", done);
		});

		describe("Quirks", function () {
			it("should convert to string if left is string", function (done) {
				runner.confirmBlock("'1' + 2 === '12';", done);
			});

			it("should convert to string if right is string", function (done) {
				runner.confirmBlock("1 + '2' === '12'", done);
			});

			it("should convert to number for subtraction operator", function (done) {
				runner.confirmBlock("'1' - 2 === -1;", done);
			});
		});

		describe("instanceof", function () {
			it("should return true for an object", function (done) {
				runner.confirmBlock("({} instanceof Object);", done);
			});

			it("should return false for not an object", function (done) {
				runner.confirmBlock("!({} instanceof String);", done);
			});

			it("should respect inheritance", function (done) {
				runner.confirmBlock("function C(){}\nfunction D(){}\nD.prototype = new C();\nvar o = new D();(o instanceof C) && (o instanceof D);", done);
			});

			it("should return false for primitive", function (done) {
				runner.confirmBlock("!('foo' instanceof String);", done);
			});
		});
	});
});
