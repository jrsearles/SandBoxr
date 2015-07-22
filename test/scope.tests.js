var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Scope", function () {
	describe("Global variables", function () {
		it("undefined exists", function () {
			var result = runner.runBlock("undefined");
			expect(result.getValue().value).to.be.undefined;
		});

		it("Infinity exists", function () {
			var result = runner.runBlock("Infinity");
			expect(result.getValue().value).to.equal(Infinity);
		});

		it("NaN exists", function () {
			var result = runner.runBlock("NaN");

			// nan doesn't equal itself
			expect(result.getValue().value).not.to.equal(result.getValue().value);
		});

		it("window exists", function () {
			var scope = runner.getScope("var x;");
			expect(scope.global.getProperty("window").getValue()).to.be.ok;
		});

		it("`this` should refer to global object", function () {
			var result = runner.runBlock("this.String === String");
			expect(result.value).to.be.true;
		});

		it("a variable attached to global this is in the global", function () {
			var result = runner.runBlock("this.foo = 2;this.foo === foo;");
			expect(result.value).to.be.true;
		});

		it("should generate a reference error if variable does not exists", function () {
			expect(function () {
				runner.runBlock("foo;");
			}).to.throw(ReferenceError);
		});

		it("should assign undeclared variable to global", function () {
			var result = runner.runBlock("var obj = {};__ref = obj;__ref !== undefined;");
			expect(result.value).to.be.true;
		});

		it("should create functions before they are called", function () {
			var result = runner.runBlock("function f() { var x;return x;function x() {}\n}\ntypeof f() === 'function'");
			expect(result.value).to.be.true;
		});
		
		it("should ignore debugger statements", function () {
			var result = runner.runBlock("debugger;1==1;");
			expect(result.value).to.be.true;
		});
	});
});
