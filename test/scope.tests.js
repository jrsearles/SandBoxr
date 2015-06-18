var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Scope", function () {
	describe("Global variables", function () {
		it("undefined exists", function () {
			var result = runner.runBlock("undefined");
			expect(result.value).to.be.undefined;
		});

		it("Infinity exists", function () {
			var result = runner.runBlock("Infinity");
			expect(result.value).to.equal(Infinity);
		});

		it("NaN exists", function () {
			var result = runner.runBlock("NaN");

			// nan doesn't equal itself
			expect(result.value).not.to.equal(result.value);
		});

		it("window exists", function () {
			var scope = runner.getScope("var x;");
			expect(scope.getValue("window")).to.be.ok;
		});

		it("`this` should refer to global object", function () {
			var result = runner.runBlock("this.String === String");
			expect(result.value).to.be.true;
		});

		it("a variable attached to global this is in the global", function () {
			var result = runner.runBlock("this.foo = 2;this.foo === foo;");
			expect(result.value).to.be.true;
		});

		it("should generate a reference error if variable does not exists", function () {
			expect(function () {
				runner.runBlock("foo;");
			}).to.throw(ReferenceError);
		});

		it("should assign undeclared variable to global", function () {
			var scope = runner.getScope("var obj = {};__ref = obj;");
			expect(scope.global.getValue("__ref")).not.to.be.undefined;
		});
	});
});
