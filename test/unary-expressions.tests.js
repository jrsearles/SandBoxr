import {describe,it} from "mocha";
import * as runner from "./test-runner";

describe("Unary Expressions", () => {
	describe("typeof operator", () => {
		it("should return `undefined` for undefined variable", done => {
			runner.confirmBlock("typeof a === 'undefined';", done);
		});

		it("should return `undefined` for undefined property", done => {
			runner.confirmBlock("var a = {};typeof a.foo=='undefined';", done);
		});
	});

	describe("- operator", () => {
		it("should negate value", done => {
			runner.confirmBlock("-(2)===-2;", done);
		});
	});

	describe ("+ operator", () => {
		it("should convert value to number", done => {
			runner.confirmBlock("+(2)===2;", done);
		});
	});

	describe("! operator", () => {
		it("should convert value to a boolean", done => {
			runner.confirmBlock("typeof(!{})==='boolean';", done);
		});

		it("should convert a primitive wrapper object to appropriate boolean", done => {
			runner.confirmBlock("!(new String())===false", done);
		});

		it("should negate a boolean value", done => {
			runner.confirmBlock("!false", done);
		});
	});

	describe("delete operator", () => {
		it("should return true for non-reference", done => {
			runner.confirmBlock("delete 42;", done);
		});

		it("should return true for non-existant variable", done => {
			runner.confirmBlock("delete a;", done);
		});

		it("should return false when deleting non-configurable property", done => {
			runner.confirmBlock("delete NaN===false;", done);
		});

		it("should not delete a variable", done => {
			runner.confirmBlock("var a = [];var d = delete a;d === false && Array.isArray(a);", done);
		});

		it("should throw a reference error if object doesn't exists", done => {
			runner.confirmError("delete o.a;", ReferenceError, done);
		});
	});
});
