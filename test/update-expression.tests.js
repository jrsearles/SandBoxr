var runner = require("./test-runner");

describe("Update Expressions", function () {
	describe("++ operator", function () {
		it("should increment a value", function (done) {
			runner.confirmBlock("var a = 0;a++;a==1;", done);
		});
	
		it("should be NaN for undefined", function (done) {
			runner.confirmBlock("var a;isNaN(++a);", done);
		});
				
		it("should add the property to an object if it doesn't exist", function (done) {
			runner.confirmBlock("var a = {};a.foo++;'foo' in a;", done);
		});
	});

	describe("-- operator", function () {
		it("should decrement a value", function (done) {
			runner.confirmBlock("var a = 0;a--;a==-1;", done);
		});			
	});
});
