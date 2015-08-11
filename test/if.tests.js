var runner = require("./test-runner");

describe("If", function () {
	it("should execute body when passing", function (done) {
		runner.confirmBlock("var a = 10;\nif (1 == 1) { a = 50; }\na==50;", done);
	});

	it("should not execute body when failing", function (done) {
		runner.confirmBlock("var a = 10;\nif (1 != 1) { a = 50; }\na==10;", done);
	});

	it("should not execute alternate when failing", function (done) {
		runner.confirmBlock("var a = 10;\nif (1 != 1) { a = 50; } else { a = 20; }\na==20;", done);
	});

	it("should evaluate true ternary expression", function (done) {
		runner.confirmBlock("true ? true : false;", done);
	});

	it("should evaluate false ternary expression", function (done) {
		runner.confirmBlock("false ? false : true;", done);
	});
});
