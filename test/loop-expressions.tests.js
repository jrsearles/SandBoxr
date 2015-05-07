var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Expression", function () {
	describe("Loops", function () {
		describe("For loops", function () {
			it("should iterate through items", function () {
				var code = "var a = 0;\nfor (var i = 0; i < 10; i++) { a++; }";
				var scope = runner.getScope(code);

				expect(scope.getProperty("a").value).to.equal(10);
			});

			it("should stop iterating when break", function () {
				var code = "var a = 0;\nfor (var i = 0; i < 10; i++) { a++; if (a > 1) { break; } }";
				var scope = runner.getScope(code);

				expect(scope.getProperty("a").value).to.equal(2);
			});

			it("should use continue to skip statements", function () {
				var code = "var a = 0;\nfor (var i = 0; i < 10; i++) { if (a > 0) { continue; } a++; }";
				var scope = runner.getScope(code);

				expect(scope.getProperty("a").value).to.equal(1);
			});
		});

		describe("For-in loops", function () {
			// it("should iterate through properties", function () {
			// 	var result = runner.runBlock("var a = {a:1,b:2,c:3},b='';\nfor(var prop in a) { b += prop; }\nb;");
			// 	expect(result.value).to.equal("abc");
			// });

			// it("should not iterate through nonenumerable properties", function () {
			// 	var result = runner.runBlock("var a = {a:1,b:2,c:3},passed=true;\nfor(var prop in a) { if (prop == 'hasOwnProperty') { passed=false; } }\npassed;");
			// 	expect(result.value).to.be.true;
			// });

			// it("should iterate through child properties", function () {
			// 	var code = "var triangle = {a:1, b:2, c:3};\nfunction ColoredTriangle() {\n  this.color = 'red';\n}\n\nColoredTriangle.prototype = triangle;\n\nvar obj = new ColoredTriangle();\nvar passed = false;\n\nfor (var prop in obj) {\n	if (prop === 'a') {\n\n	passed = true;\n	}\n}\npassed;";
			// 	var result = runner.runBlock(code);
			// 	expect(result.value).to.be.true;
			// });
		});
	});
});
