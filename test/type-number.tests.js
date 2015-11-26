import {describe, it} from "mocha";
import * as runner from "./test-runner";

describe("Type: Number", () => {
	it("should show 'number' as typeof", done => {
		runner.confirmBlock("typeof 5==='number';", done);
	});

	it("should evaluate signed numbers per spec", done => {
		runner.confirmBlock("1/+0 !== 1/-0;", done);
	});

	["MIN_VALUE", "MAX_VALUE", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"].forEach(function (name) {
		it("should have constants: " + name, done => {
			runner.confirmBlock("Number." + name + " == " + Number[name] + ";", done);
		});
	});

	describe("as object", () => {
		it("should return as object if called with `new`", done => {
			runner.confirmBlock("typeof new Number(1) == 'object';", done);
		});

		it("should not strictly equal a number primitive", done => {
			runner.confirmBlock("!(1 === new Number(1));", done);
		});

		it("should implicitly equal a number primitive", done => {
			runner.confirmBlock("1 == new Number(1);", done);
		});
	});

	describe("when converting", () => {
		it("should create number when called as function", done => {
			runner.confirmBlock("Number(5)===5", done);
		});

		it("should use toString if valueOf does not return number", done => {
			runner.confirmBlock("var __obj = {toString: function() {return '1'}, valueOf: function() {return new Object();}};Number(__obj)===1;", done);
		});

		it("should convert to string when calling toString", done => {
			runner.confirmBlock("(5).toString()==='5';", done);
		});
	});
});
