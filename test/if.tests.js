/// <reference path="../typings/mocha/mocha.d.ts"/>
var runner = require("./test-runner");
var expect = require("chai").expect;

describe("If", function () {
	it("should execute body when passing", function () {
		var result = runner.runBlock("var a = 10;\nif (1 == 1) { a = 50; }\na==50;");
		expect(result.value).to.be.true;
	});

	it("should not execute body when failing", function () {
		var result = runner.runBlock("var a = 10;\nif (1 != 1) { a = 50; }\na==10;");
		expect(result.value).to.be.true;
	});

	it("should not execute alternate when failing", function () {
		var result = runner.runBlock("var a = 10;\nif (1 != 1) { a = 50; } else { a = 20; }\na==20;");
		expect(result.value).to.be.true;
	});

	it("should evaluate true ternary expression", function () {
		var result = runner.runBlock("true ? true : false;");
		expect(result.value).to.be.true;
	});

	it("should evaluate false ternary expression", function () {
		var result = runner.runBlock("false ? false : true;");
		expect(result.value).to.be.true;
	});
});
