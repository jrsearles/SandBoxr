var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Functions", function () {
	it("should return a value from a named function", function () {
		var result = runner.runBlock("function a() { return 50; }\na()==50;");
		expect(result.value).to.be.true;
	});

	it("should return a value from a function assigned to variable", function () {
		var result = runner.runBlock("var a = function () { return 50; };\na()==50;");
		expect(result.value).to.be.true;
	});

	it("should pass parameters into function", function () {
		var result = runner.runBlock("var a = function (b) { return b; };\na(50)==50;");
		expect(result.value).to.be.true;
	});

	it("should be able to access variable in outer scope", function () {
		var result = runner.runBlock("var a = 50;\nfunction b() { return a; }\nb()==50;");
		expect(result.value).to.be.true;
	});

	it("should be able to `call` a function", function () {
		var result = runner.runBlock("function a(x, y) { return x + y; }\na.call(null, 10, 40)==50;");
		expect(result.value).to.be.true;
	});

	it("should be able to control `this` with `call`", function () {
		var result = runner.runBlock("var a = {};function b() { return this === a; }\nb.call(a)==true;");
		expect(result.value).to.be.true;
	});

	it("should be able to `apply` a function", function () {
		var result = runner.runBlock("function a(x, y) { return x + y; }\na.apply(null, [10, 40])==50;");
		expect(result.value).to.be.true;
	});

	it("should be able to coercively compare functions", function () {
		var result = runner.runBlock("var a = function(){};var b = a;a == b;");
		expect(result.value).to.be.true;
	});

	it("should link arguments object to the named parameters", function () {
		var result = runner.runBlock("(function (a) { a++;return a===arguments[0]; })(1)==true;");
		expect(result.value).to.be.true;
	});

	describe("Function.prototype.bind", function () {
		it("should return a function", function () {
			var result = runner.runBlock("var a = function () {};typeof a.bind({}) === 'function';");
			expect(result.value).to.be.true;
		});

		it("should return a new function", function () {
			var result = runner.runBlock("var a = function () {};var b = a.bind({});a !== b;");
			expect(result.value).to.be.true;
		});

		it("should set the scope of the new function", function () {
			var result = runner.runBlock("var a = {};var b = function () { return this === a; };b.bind(a)()==true;");
			expect(result.value).to.be.true;
		});

		it("should use the arguments assigned, along with those provided at call time", function () {
			var result = runner.runBlock("var a = function (a,b,c) { return a + b + c; };a.bind(null,2,3)(-5)==0;");
			expect(result.value).to.be.true;
		});
	});

	describe("scope", function () {
		it("should be able to read value from parent scope", function () {
			var result = runner.runBlock("var a = (function(global) { return function (value) { return global.String(value); }; })(this);\na('foo')=='foo';");
			expect(result.value).to.be.true;
		});
	});
});
