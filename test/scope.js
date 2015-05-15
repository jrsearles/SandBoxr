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
			expect(scope.getProperty("window")).to.be.ok;
		});

		it("`this` should refer to global object", function () {
			var result = runner.runBlock("this.String === String");
			expect(result.value).to.be.true;
		});
	});
});
