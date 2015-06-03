var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Try-Catch-Finally", function () {
	it("should not throw an exception if an error occurs in a try-block", function () {
		var result = runner.runBlock("try { var a = {}; a.b(); } catch (err) { }\ntrue;");
		expect(result.value).to.be.true;
	});

	it("should throw an exception if an error occurs outside of a try-block", function () {
		expect(function () {
			runner.runBlock("var a = {}; a.b();");
		}).to.throw(TypeError);
	});

	it("should not execute the catch block if no error is thrown", function () {
		var result = runner.runBlock("var passed = true;try {;} catch (err) { passed = false; }\npassed;");
		expect(result.value).to.be.true;
	});

	it("should execute the catch block if error is thrown", function () {
		var result = runner.runBlock("var passed = false;try { a(); } catch (err) { passed = true; }\npassed;");
		expect(result.value).to.be.true;
	});
	
	it("should execute the finalizer when no error occurs", function () {
		var result = runner.runBlock("var passed = false;try {;} finally { passed = true; }\npassed;");
		expect(result.value).to.be.true;
	});

	it("should execute the finalizer when no error occurs", function () {
		var result = runner.runBlock("var passed = false;try { a();} finally { passed = true; }\npassed;");
		expect(result.value).to.be.true;
	});

	it("should continue executing code outside of the try block.", function () {
		var result = runner.runBlock("var passed = false;try { a(); } catch (err) {;}\npassed = true;passed;");
		expect(result.value).to.be.true;
	});

	it("should stop executing code within the try block.", function () {
		var code = "var passed=true;try {\nvar object = {valueOf: function() {throw 'error'}, toString: function() {return 1}};\n~object;passed=false;}\ncatch (e) {;}\npassed;";
		var result = runner.runBlock(code);
		expect(result.value).to.be.true;
	});

	it("should prefer return from finalizer", function () {
		var result = runner.runBlock("function f() { try { return false; } finally { return true; }\n}\nf();");
		expect(result.value).to.be.true;
	});
});
