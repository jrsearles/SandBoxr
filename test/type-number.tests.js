var runner = require("./test-runner");

describe("Type: Number", function () {
	it("should show 'number' as typeof", function (done) {
		runner.confirmBlock("typeof 5==='number';", done);
	});

	it("should evaluate signed numbers per spec", function (done) {
		runner.confirmBlock("1/+0 !== 1/-0;", done);
	});
	
	["MIN_VALUE", "MAX_VALUE", "NEGATIVE_INFINITY", "POSITIVE_INFINITY"].forEach(function (name) {
		it("should have constants: " + name, function (done) {
			runner.confirmBlock("Number." + name + " == " + Number[name] + ";", done);
		});
	});

	describe("as object", function () {
		it("should return as object if called with `new`", function (done) {
			runner.confirmBlock("typeof new Number(1) == 'object';", done);
		});

		it("should not strictly equal a number primitive", function (done) {
			runner.confirmBlock("!(1 === new Number(1));", done);
		});

		it("should implicitly equal a number primitive", function (done) {
			runner.confirmBlock("1 == new Number(1);", done);
		});		
	});

	describe("when converting", function () {
		it("should create number when called as function", function (done) {
			runner.confirmBlock("Number(5)===5", done);
		});
		
		it("should use toString if valueOf does not return number", function (done) {
			runner.confirmBlock("var __obj = {toString: function() {return '1'}, valueOf: function() {return new Object();}};Number(__obj)===1;", done);
		});
			
		it("should convert to string when calling toString", function (done) {
			runner.confirmBlock("(5).toString()==='5';", done);
		});
	});
});
