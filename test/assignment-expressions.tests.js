import {describe,it} from "mocha";
import * as runner from "./test-runner";

describe("Expressions", () => {
	describe("Assignment Expressions", () => {
		const left = 1;
		const right = 2;

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
		].forEach(current => {
			it("should apply " + current.op, done => {
				let code = "var a = " + left + "; a " + current.op + " " + right + ";a == " + current.expected + ";";
				runner.confirmBlock(code, done);
			});
		});
	});


	it("should error if the left side is null", done => {
		runner.confirmError("var x = (y *= 1);", ReferenceError, done);
	});

	it("should increment value", done => {
		let code = "var a = 0; a++;a==1;";
		runner.confirmBlock(code, done);
	});

	it("should decrement value", done => {
		let code = "var a = 0; a--;a==-1;";
		runner.confirmBlock(code, done);
	});

	it("should decrement value after returning", done => {
		let code = "var a = 0; var b = a--;b==0;";
		runner.confirmBlock(code, done);
	});
});
