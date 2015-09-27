import {describe,it} from "mocha";
import {expect} from "chai";
import * as runner from "./test-runner";

describe("Type: RegExp", () => {
	it("should evaluate as typeof object", done => {
		runner.confirmBlock("typeof /a/ == 'object';", done);
	});

	describe("RegExp.prototype.test", () => {
		it("should return true when the string matches", done => {
			runner.confirmBlock("/a/.test('abc');", done);
		});

		it("should return false when the string does not match", done => {
			runner.confirmBlock("/a/.test('xyz')===false;", done);
		});
	});

	describe("RegExp.prototype.exec", () => {
		it("should return an array if matches", done => {
			runner.confirmBlock("Array.isArray(/a/.exec('abc'));", done);
		});

		it("should return a null if no matches", done => {
			runner.confirmBlock("/a/.exec('xyz')===null;", done);
		});

		it("should have the matches in the array", done => {
			let re = /quick\s(brown).+?(jumps)/ig;
			let expected = re.exec("The Quick Brown Fox Jumps Over The Lazy Dog");

			runner.runBlock("(/quick\\s(brown).+?(jumps)/ig).exec('The Quick Brown Fox Jumps Over The Lazy Dog')")
				.then(actual => {

					for (let i = 0, ln = expected.length; i < ln; i++) {
						expect(actual.getProperty(i).getValue().value).to.equal(expected[i]);
					}

					expect(actual.getProperty("index").getValue().value).to.equal(expected.index);
					expect(actual.getProperty("input").getValue().value).to.equal(expected.input);
					done();
				});
		});

		it("should update the lastIndex when a match is made", done => {
			let re = /quick\s(brown).+?(jumps)/ig;
			re.exec("The Quick Brown Fox Jumps Over The Lazy Dog");

			runner.confirmBlock("var re = /quick\\s(brown).+?(jumps)/ig;re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');re.lastIndex===" + re.lastIndex + ";", done);
		});
	});
});
