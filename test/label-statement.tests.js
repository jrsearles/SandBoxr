var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Label Statements", function () {
	// it("should break to outer loop when expected", function () {
	// 	var code = "var i, j, result='';\nloop1:\nfor (i = 0; i < 3; i++) {\n   loop2:\n   for (j = 0; j < 3; j++) {   \n      if (i == 1 && j == 1) {\n         continue loop1;\n      }\n      result += i + ' ' + j;\n   }\n}";
	// 	var scope = runner.getScope(code);

	// 	expect(scope.global.getProperty("result").getValue().value).to.equal("0 00 10 21 02 02 12 2");
	// });
});
