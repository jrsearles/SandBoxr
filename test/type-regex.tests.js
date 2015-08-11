var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Regex", function () {
	it("should evaluate as typeof object", function (done) {
		runner.confirmBlock("typeof /a/ == 'object';", done);
	});

	describe("test", function () {
		it("should return true when the string macthes", function (done) {
			runner.confirmBlock("/a/.test('abc');", done);
		});

		it("should return false when the string does not match", function (done) {
			runner.confirmBlock("/a/.test('xyz')===false;", done);
		});
	});

	describe("exec", function () {
		it("should return an array if matches", function (done) {
			runner.confirmBlock("Array.isArray(/a/.exec('abc'));", done);
		});

		it("should return a null if no matches", function (done) {
			runner.confirmBlock("/a/.exec('xyz')===null;", done);
		});

		it("should have the matches in the array", function (done) {
			var re = /quick\s(brown).+?(jumps)/ig;
			var expected = re.exec("The Quick Brown Fox Jumps Over The Lazy Dog");

			runner.runBlock("(/quick\\s(brown).+?(jumps)/ig).exec('The Quick Brown Fox Jumps Over The Lazy Dog')")
				.then(function (actual) {
		
					for (var i = 0, ln = expected.length; i < ln; i++) {
						expect(actual.getProperty(i).getValue().value).to.equal(expected[i]);
					}
	
					expect(actual.getProperty("index").getValue().value).to.equal(expected.index);
					expect(actual.getProperty("input").getValue().value).to.equal(expected.input);
					done();
				});
		});

		it("should update the lastIndex when a match is made", function (done) {
			var re = /quick\s(brown).+?(jumps)/ig;
			re.exec("The Quick Brown Fox Jumps Over The Lazy Dog");

			runner.confirmBlock("var re = /quick\\s(brown).+?(jumps)/ig;re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');re.lastIndex===" + re.lastIndex + ";", done);
		});
	});
});
