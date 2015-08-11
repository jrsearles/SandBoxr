var runner = require("./test-runner");

describe("WithStatement", function () {
	it("should use the object in the scope", function (done) {
		runner.confirmBlock("var o={foo:true}, result;with(o){result = foo}\nresult==true;", done);
	});
});
