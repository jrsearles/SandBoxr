var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Prototype tests", function () {
	it("should create a new object", function () {
		var result = runner.runBlock("function FooObj() {};var o=new FooObj();typeof o=='object';");
		expect(result.value).to.be.true;
	});

	it("should inherit from object", function () {
		var result = runner.runBlock("function foo() {};foo.prototype.bar = 'empty';\nvar o = new foo();\no.bar=='empty';");
		expect(result.value).to.be.true;
	});
});
