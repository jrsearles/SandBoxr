var runner = require("./test-runner");
var expect = require("chai").expect;
/*
enum AssignmentOperator {
    "=" | "+=" | "-=" | "*=" | "/=" | "%="
        | "<<=" | ">>=" | ">>>="
        | "|=" | "^=" | "&="
}
*/

describe("Expressions", function () {
	describe("Assignment Expressions", function () {
		var left = 1;
		var right = 2;

		[
			{ op:	"=", name: "Assignment", expected: right },
			{ op:	"+=", name: "Addtion assignment", expected: left + right },
			{ op:	"-=", name: "Subtraction assignment", expected: left - right },
			{ op:	"*=", name: "Multiplication assignment", expected: left * right },
			{ op:	"/=", name: "Division assignment", expected: left / right },
			{ op:	"%=", name: "Remainder assignment", expected: left % right },
			{ op:	"<<=", name: "Left shift assignment", expected: left << right },
			{ op:	">>=", name: "Right shift assignment", expected: left >> right },
			{ op:	">>>=", name: "Unsigned right shift assignment", expected: left >>> right },
			{ op:	"|=", name: "Bitwise AND assignment", expected: left | right },
			{ op:	"^=", name: "Bitwise XOR assignment", expected: left ^ right },
			{ op:	"&=", name: "Bitwise OR assignment", expected: left & right }
		].forEach(function (current) {
			it("should apply " + current.op, function () {
				var code = "var a = " + left + "; a " + current.op + " " + right + ";";
				var scope = runner.getScope(code);

				expect(scope.getValue("a").value).to.equal(current.expected);
			});
		});
	});

	it("should increment value", function () {
		var code = "var a = 0; a++;";
		var scope = runner.getScope(code);

		expect(scope.getValue("a").value).to.equal(1);
	});

	it("should decrement value", function () {
		var code = "var a = 0; a--";
		var scope = runner.getScope(code);

		expect(scope.getValue("a").value).to.equal(-1);
	});


	it("should decrement value after returning", function () {
		var code = "var a = 0; var b = a--";
		var scope = runner.getScope(code);

		expect(scope.getValue("b").value).to.equal(0);
	});
});
