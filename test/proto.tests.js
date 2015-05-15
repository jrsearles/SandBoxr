var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Prototype tests", function () {
	it("should create a new object", function () {
		var result = runner.runBlock("function FooObj() {};typeof new FooObj();");
		expect(result.value).to.equal("object");
	});

	it("should inherit from object", function () {
		var result = runner.runBlock("function foo() {};foo.prototype.bar = 'empty';\nvar o = new foo();\no.hasOwnProperty('bar');");
		expect(result.value).to.be.a("boolean");
	});
});
