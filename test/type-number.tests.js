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

		describe("when creating", function () {
			it("should return as object if called with `new`", function () {
				var result = runner.runBlock("typeof new Number(1)");
				expect(result.value).to.equal("object");
			});

			it("should not strictly equal a number primitive", function () {
				var result = runner.runBlock("1 === new Number(1);");
				expect(result.value).to.be.false;
			});

			it("should implicitly equal a number primitive", function () {
				var result = runner.runBlock("1 == new Number(1);");
				expect(result.value).to.be.true;
			});
		});

		describe("when converting", function () {
			it("should use toString if valueOf does not return number", function () {
				var result = runner.runBlock("var __obj = {toString: function() {return '1'}, valueOf: function() {return new Object();}};Number(__obj);");
				expect(result.value).to.equal(1);
			});
		});

		it("should evaluate signed numbers per spec", function () {
			var result = runner.runBlock("1/+0 !== 1/-0;");
			expect(result.value).to.be.true;
		});
	});
});
