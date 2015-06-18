var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Regex", function () {
	it("should evaluate as typeof object", function () {
		var result = runner.runBlock("typeof /a/;");
		expect(result.value).to.equal("object");
	});

	describe("test", function () {
		it("should return true when the string macthes", function () {
			var result = runner.runBlock("/a/.test('abc');");
			expect(result.value).to.be.true;
		});

		it("should return false when the string does not match", function () {
			var result = runner.runBlock("/a/.test('xyz');");
			expect(result.value).to.be.false;
		});
	});

	describe("exec", function () {
		it("should return an array if matches", function () {
			var result = runner.runBlock("Array.isArray(/a/.exec('abc'));");
			expect(result.value).to.be.true;
		});

		it("should return a null if no matches", function () {
			var result = runner.runBlock("/a/.exec('xyz');");
			expect(result.value).to.be.null;
		});

		it("should have the matches in the array", function () {
			var re = /quick\s(brown).+?(jumps)/ig;
			var expected = re.exec("The Quick Brown Fox Jumps Over The Lazy Dog");

			var actual = runner.runBlock("(/quick\\s(brown).+?(jumps)/ig).exec('The Quick Brown Fox Jumps Over The Lazy Dog')");

			for (var i = 0, ln = expected.length; i < ln; i++) {
				expect(actual.getValue(i).value).to.equal(expected[i]);
			}

			expect(actual.getValue("index").value).to.equal(expected.index);
			expect(actual.getValue("input").value).to.equal(expected.input);
		});

		it("should update the lastIndex when a match is made", function () {
			var re = /quick\s(brown).+?(jumps)/ig;
			re.exec("The Quick Brown Fox Jumps Over The Lazy Dog");

			var scope = runner.getScope("var re = /quick\\s(brown).+?(jumps)/ig;re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');");

			expect(scope.getValue("re").getValue("lastIndex").value).to.equal(re.lastIndex);
		});
	});
});
