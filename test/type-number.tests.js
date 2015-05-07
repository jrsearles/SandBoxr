var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Types", function () {
	describe("Number", function () {
		var constants = ["MIN_VALUE", "MAX_VALUE", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"];

		it("should show 'number' as typeof", function () {
			var result = runner.runBlock("typeof 5;");
			expect(result.value).to.equal("number");
		});

		it("should create number when called as function", function () {
			var result = runner.runBlock("Number(5)");
			expect(result.value).to.equal(5);
		});

		it("should convert to string when calling toString", function () {
			var result = runner.runBlock("(5).toString();");
			expect(result.value).to.equal("5");
		});

		it("should have constants", function () {
			constants.forEach(function (name) {
				var result = runner.runBlock("Number." + name + ";");
				expect(result.value).to.equal(Number[name]);
			});
		});
	});
});
