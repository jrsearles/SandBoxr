var runner = require("./test-runner");

describe("Expressions", function () {
	describe("Update Expressions", function () {
		it("++ should increment a value", function (done) {
			runner.confirmBlock("var a = 0;a++;a==1;", done);
		});

		it("++ should be NaN for undefined", function (done) {
			runner.confirmBlock("var a;isNaN(++a);", done);
		});

		it("-- should increment a value", function (done) {
			runner.confirmBlock("var a = 0;a--;a==-1;", done);
		});

		it("should add the property to an object if it doesn't exist", function (done) {
			runner.confirmBlock("var a = {};a.foo++;'foo' in a;", done);
		});

		it("should error if the left side is null", function (done) {
			runner.confirmError("var x = (y *= 1);", ReferenceError, done);
		});
	});
});
