var runner = require("./test-runner");

describe("Prototype tests", function () {
	it("should create a new object", function (done) {
		runner.confirmBlock("function FooObj() {};var o=new FooObj();typeof o=='object';", done);
	});

	it("should inherit from object", function (done) {
		runner.confirmBlock("function foo() {};foo.prototype.bar = 'empty';\nvar o = new foo();\no.bar=='empty';", done);
	});
});
