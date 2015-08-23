var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Type: String", function () {
	[
		{ fn: "charAt", args: [1] },
		{ fn: "charAt", args: [99] },

		{ fn: "charCodeAt", args: [1] },

		{ fn: "concat", args: ["bar"] },
		{ fn: "concat", args: ["bar", "baz"] },

		{ fn: "indexOf", args: ["Foo"] },
		{ fn: "indexOf", args: ["Foo", 0] },
		{ fn: "indexOf", args: ["b"] },
		{ fn: "indexOf", args: ["b", 1] },
		{ fn: "indexOf", args: ["", 10] },

		{ fn: "lastIndexOf", args: ["o"] },
		{ fn: "lastIndexOf", args: ["o", 2] },
		{ fn: "lastIndexOf", args: ["b"] },

		{ fn: "localeCompare", args: ["Foo"] },
		{ fn: "localeCompare", args: ["foo"] },
		{ fn: "localeCompare", args: ["bar"] },

		{ source: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", fn: "match", args: [/[A-E]/gi] },
		{ source: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", fn: "match", args: [/[0-9]/gi] },

		{ source: "Apples are round, and apples are juicy.", fn: "replace", args: [/apples/gi, "oranges"] },
		{ source: "ApplesAreRoundAndApplesAreJuicy", fn: "replace", args: [/[A-Z]/g, function (match, p1) { return " " + p1; }] },

		{ source: "The morning is upon us.", fn: "search", args: [/morn/] },
		{ source: "The morning is upon us.", fn: "search", args: [/[0-9]/] },
		
		{ source: "The morning is upon us.", fn: "slice", args: [4, -2] },
		{ source: "The morning is upon us.", fn: "slice", args: [-3] },
		{ source: "The morning is upon us.", fn: "slice", args: [-3, -1] },
		{ source: "The morning is upon us.", fn: "slice", args: [0, -1] },

		{ source: "Oh brave new world that has such people in it.", fn: "split", args: [" "] },
		{ source: "Oh brave new world that has such people in it.", fn: "split", args: [] },
		{ source: "Hello World. How are you doing?", fn: "split", args: [" ", 3] },
		{ source: "Hello World. How are you doing?", fn: "split", args: [/\s/g] },

		{ source: "abcdefghij", fn: "substr", args: [1, 2] },
		{ source: "abcdefghij", fn: "substr", args: [-3, 2] },
		{ source: "abcdefghij", fn: "substr", args: [-3] },
		{ source: "abcdefghij", fn: "substr", args: [-20, 2] },
		{ source: "abcdefghij", fn: "substr", args: [20, 2] },

		{ source: "abcdefghij", fn: "substring", args: [0, 3] },
		{ source: "abcdefghij", fn: "substring", args: [3, 0] },
		{ source: "abcdefghij", fn: "substring", args: [4, 7] },
		{ source: "abcdefghij", fn: "substring", args: [7, 4] },

		{ source: "ABCD", fn: "toLocaleLowerCase", args: [] },
		{ source: "abcd", fn: "toLocaleUpperCase", args: [] },
		{ source: "ABCD", fn: "toLowerCase", args: [] },
		{ source: "abcd", fn: "toUpperCase", args: [] },

		{ fn: "toString", args: [] },

		{ source: "    foo     ", fn: "trim", args: [] },
		{ source: "foo    ", fn: "trim", args: [] },

		{ fn: "valueOf", args: [] }
	].forEach(function (testCase) {
		it("String.prototype." + testCase.fn + ": should return expected results with args: " + runner.wrapArgs(testCase.args), function (done) {
			var source = testCase.source || "Foo";
			var expected = source[testCase.fn].apply(source, testCase.args);
			var code = "'" + source + "'." + testCase.fn + "(" + runner.wrapArgs(testCase.args) + ");";
			
			runner.runBlock(code).then(function (result) {
	
				if (Array.isArray(expected)) {
					expect(result.getProperty("length").getValue().value).to.equal(expected.length);
					expected.forEach(function (value, index) {
						expect(result.getProperty(index).getValue().value).to.equal(value);
					});
				} else {
					expect(result.getValue().value).to.equal(expected);
				}
				
				done();
			});
		});
	});

	describe("String.fromCharCode", function () {
		it("should return expected value", function (done) {
			runner.confirmBlock("String.fromCharCode(65, 66, 67)=='ABC';", done);
		});
	});

	describe("String.prototype.length", function () {
		it("should return the length of the string.", function (done) {
			runner.confirmBlock("'foo'.length==3;", done);
		});

		it("should ignore when length is set", function (done) {
			runner.confirmBlock("var a = 'foo';a.length = 2;a.length==3;", done);
		});
	});

	describe("When using bracket notation", function () {
		it("should return character at that position", function (done) {
			runner.confirmBlock("'foo'[1] == 'o';", done);
		});

		it("should return undefined if position is not in array", function (done) {
			runner.confirmBlock("'foo'[99] === undefined;", done);
		});

		it("should not allow character to be replaced by position", function (done) {
			runner.confirmBlock("var a = 'foo'; a[1] = 'f';a === 'foo';", done);
		});
	});

	describe("When converting", function () {
		it("should use overridden `toString` if set.", function (done) {
			runner.confirmBlock("var a = {toString:function() { return 'foo'; } };String(a) == 'foo';", done);
		});

		it("should throw a type error if overridden `toString` returns an object", function (done) {
			runner.confirmError("var a = {toString:function() { return {}; } };String(a);", TypeError, done);
		});
	});
	
	describe("as object", function () {
		it("should show typeof `object` when creating use `new`", function (done) {
			runner.confirmBlock("typeof new String('foo') == 'object';", done);
		});

		it("should not strictly equal a primitive string", function (done) {
			runner.confirmBlock("new String('foo') !== 'foo';", done);
		});

		it("should implicitly equal a primitive string", function (done) {
			runner.confirmBlock("new String('foo') == 'foo';", done);
		});
	});
});
