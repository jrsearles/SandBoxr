var runner = require("./test-runner");

describe("Expression", function () {
	describe("Loops", function () {
		describe("For loops", function () {
			it("should iterate through items", function (done) {
				var code = "var a = 0;\nfor (var i = 0; i < 10; i++) { a++; }\na==10;";
				runner.confirmBlock(code, done);
			});

			it("should stop iterating when break", function (done) {
				var code = "var a = 0;\nfor (var i = 0; i < 10; i++) { a++; if (a > 1) { break; } }\na==2;";
				runner.confirmBlock(code, done);
			});

			it("should use continue to skip statements", function (done) {
				var code = "var a = 0;\nfor (var i = 0; i < 10; i++) { if (a > 0) { continue; } a++; }\na==1;";
				runner.confirmBlock(code, done);
			});
		});

		describe("For-in loops", function () {
			// it.only("should iterate through properties", function () {
			// 	runner.confirmBlock("var a = {a:1,b:2,c:3},b='';\nfor(var prop in a) { b += prop; }\nb;");
			// 	expect(result.value).to.equal("abc");
			// });

			// it.only("should not iterate through nonenumerable properties", function () {
			// 	runner.confirmBlock("var a = {a:1,b:2,c:3},passed=true;\nfor(var prop in a) { if (prop == 'hasOwnProperty') { passed=false; } }\npassed;");
			// 	expect(result.value).to.be.true;
			// });

			// it.only("should iterate through child properties", function () {
			// 	var code = "var triangle = {a:1, b:2, c:3};\nfunction ColoredTriangle() {\n  this.color = 'red';\n}\n\nColoredTriangle.prototype = triangle;\n\nvar obj = new ColoredTriangle();\nvar passed = false;\n\nfor (var prop in obj) {\n	if (prop === 'a') {\n\n	passed = true;\n	}\n}\npassed;";
			// 	runner.confirmBlock(code);
			// 	expect(result.value).to.be.true;
			// });
		});

		describe("Do while loops", function () {
			it("should execute until false", function (done) {
				runner.confirmBlock("var counter=0;while (counter < 5) { counter++; }\ncounter==5;", done);
			});

			it("should never execute if the test is never true", function (done) {
				runner.confirmBlock("var counter=10;while (counter < 5) { counter = 20; }\ncounter==10;", done);
			});

			it("should keep executing until first time it because false for do-while", function (done) {
				runner.confirmBlock("var counter=10;do { counter = 20; } while (counter < 5)\ncounter==20;", done);
			});
		});
	});
});
