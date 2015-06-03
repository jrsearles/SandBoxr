var runner = require("./test-runner");
var expect = require("chai").expect;

describe("WithStatement", function () {
	it("should use the object in the scope", function () {
		var result = runner.runBlock("var o={foo:true};with(o){foo}");
		expect(result.value).to.be.true;
	});
});
