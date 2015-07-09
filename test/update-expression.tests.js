var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Expressions", function () {
	describe("Update Expressions", function () {
		it("++ should increment a value", function () {
			var result = runner.runBlock("var a = 0;a++;a==1;");
			expect(result.value).to.be.true;
		});

		it("++ should be NaN for undefined", function () {
			var result = runner.runBlock("var a;isNaN(++a);");
			expect(result.value).to.be.true;
		});

		it("-- should increment a value", function () {
			var result = runner.runBlock("var a = 0;a--;a==-1;");
			expect(result.value).to.be.true;
		});

		it("should add the property to an object if it doesn't exist", function () {
			var result = runner.runBlock("var a = {};a.foo++;'foo' in a;");
			expect(result.value).to.be.true;
		});

		it("should error if the left side is null", function () {
			expect(function () {
				runner.runBlock("var x = (y *= 1);");
			}).to.throw(ReferenceError);
		});
	});
});
