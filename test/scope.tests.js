var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Scope", function () {
	describe("strict mode", function () {
		it("should detect 'use strict' literal and set scope to strict mode", function () {
			var scope = runner.getScope("'use strict';");
			expect(scope.current.strict).to.be.true;
		});
		
		it("should inherit strict mode in `eval`", function (done) {
			var code = "(function() { 'use strict';\neval('var public = 1'); })();";
			runner.confirmError(code, SyntaxError, done);
		});
	});
	
	describe("Global variables", function () {
		it("undefined exists", function (done) {
			runner.confirmBlock("typeof undefined==='undefined';", done);
		});

		it("Infinity exists", function (done) {
			runner.confirmBlock("typeof Infinity==='number';", done);
		});

		it("NaN exists", function (done) {
			runner.confirmBlock("NaN!==NaN;", done);
		});

		it("global this exists", function (done) {
			runner.confirmBlock("var x;'x' in this;", done);
		});

		it("`this` should refer to global object", function (done) {
			runner.confirmBlock("this.String === String", done);
		});

		it("a variable attached to global this is in the global", function (done) {
			runner.confirmBlock("this.foo = 2;this.foo === foo;", done);
		});

		it("should generate a reference error if variable does not exists", function (done) {
			runner.runBlock("foo;").then(null, function (err) {
				expect(err).to.be.instanceof(ReferenceError);
				done();
			});
		});

		it("should assign undeclared variable to global", function (done) {
			runner.confirmBlock("var obj = {};__ref = obj;__ref !== undefined;", done);
		});

		it("should create functions before they are called", function (done) {
			runner.confirmBlock("function f() { var x;return x;function x() {}\n}\ntypeof f() === 'function'", done);
		});
		
		it("should ignore debugger statements", function (done) {
			runner.confirmBlock("debugger;1==1;", done);
		});
	});
});
