var runner = require("./test-runner");

describe("Try-Catch-Finally", function () {
	it("should not throw an exception if an error occurs in a try-block", function (done) {
		runner.confirmBlock("try { var a = {}; a.b(); } catch (err) { }\ntrue==true;", done);
	});

	it("should throw an exception if an error occurs outside of a try-block", function (done) {
		runner.confirmError("var a = {}; a.b();", TypeError, done);
	});

	it("should not execute the catch block if no error is thrown", function (done) {
		runner.confirmBlock("var passed = true;try {;} catch (err) { passed = false; }\npassed==true;", done);
	});

	it("should execute the catch block if error is thrown", function (done) {
		runner.confirmBlock("var passed = false;try { a(); } catch (err) { passed = true; }\npassed==true;", done);
	});

	it("should execute the finalizer when no error occurs", function (done) {
		runner.confirmBlock("var passed = false;try { } finally { passed = true; }\npassed==true;", done);
	});

	it("should continue executing code outside of the try block.", function (done) {
		runner.confirmBlock("var passed = false;try { a(); } catch (err) {;}\npassed = true;passed==true;", done);
	});

	it("should stop executing code within the try block.", function (done) {
		var code = "var passed=true;try {\nvar object = {valueOf: function() {throw 'error'}, toString: function() {return 1}};\n~object;passed=false;}\ncatch (e) {;}\npassed==true;";
		runner.confirmBlock(code, done);
	});

	it("should prefer return from finalizer", function (done) {
		runner.confirmBlock("function f() { try { return false; } finally { return true; }\n}\nf();", done);
	});

	it("should be able to determine instanceof thrown error", function (done) {
		runner.confirmBlock("var result = false;try { throw new TypeError() } catch (err) { result = err instanceof TypeError; }\nresult==true;", done);
	});

	it("should bubble up exception from uncaught from a function", function (done) {
		runner.confirmError("function a() {\ntry { throw new TypeError(); } finally { }\n}\na();", TypeError, done);
	});
});
