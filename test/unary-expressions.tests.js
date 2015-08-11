var runner = require("./test-runner");

describe("Expressions", function () {
	describe("Unary Expressions", function () {
		it("should return `undefined` for undefined variable", function (done) {
			runner.confirmBlock("typeof a === 'undefined';", done);
		});

		it("should return `undefined` for undefined property", function (done) {
			runner.confirmBlock("var a = {};typeof a.foo=='undefined';", done);
		});

		it("should negate negative operators", function (done) {
			runner.confirmBlock("-(2)===-2;", done);
		});

		it("should convert `+` operator to number", function (done) {
			runner.confirmBlock("+(2)===2;", done);
		});

		it("should convert a '!' to a boolean", function (done) {
			runner.confirmBlock("typeof(!{})==='boolean';", done);
		});

		it("should convert a primitive wrapper object to appropriate boolean", function (done) {
			runner.confirmBlock("!(new String())===false", done);
		});

		it("should negate a boolean value", function (done) {
			runner.confirmBlock("!false", done);
		});

		describe("delete", function () {
			it("should be true for non-reference", function (done) {
				runner.confirmBlock("delete 42;", done);
			});

			it("should return true for non-existant variable", function (done) {
				runner.confirmBlock("delete a;", done);
			});

			it("should return false when deleting non-configurable property", function (done) {
				runner.confirmBlock("delete NaN===false;", done);
			});

			it("should not delete a variable", function (done) {
				runner.confirmBlock("var a = [];var d = delete a;d === false && Array.isArray(a);", done);
			});

			it("should throw a reference error if object doesn't exists", function(done) {
				runner.confirmError("delete o.a;", ReferenceError, done);
			});
		});
	});
});
