import {describe,it} from "mocha";
import * as runner from "./test-runner";

describe("JSON", () => {
	describe("stringify", () => {
		it("should process string as expected", done => {
			runner.confirmBlock("JSON.stringify('foo')=='\"foo\"'", done);
		});

		it("should process number as expected", done => {
			runner.confirmBlock("JSON.stringify(123)=='123'", done);
		});

		it("should process boolean as expected", done => {
			runner.confirmBlock("JSON.stringify(true)=='true'", done);
		});

		it("should process date as expected", done => {
			runner.confirmBlock("JSON.stringify(new Date(2000,1,1))=='\"2000-02-01T05:00:00.000Z\"';", done);
		});

		it("should process array as expected", done => {
			runner.confirmBlock("JSON.stringify([42])=='[42]'", done);
		});

		it("should use replacer with array", done => {
			runner.confirmBlock("JSON.stringify([42], function (k,v) { return v===42?'fourtytwo':v; })=='[\"fourtytwo\"]'", done);
		});

		it("should throw type error for circular object", done => {
			runner.confirmError("var o={};o.prop=o;JSON.stringify(o);", TypeError, done);
		});

		it("should throw type error for circular array", done => {
			runner.confirmError("var a=[];a[0]=a;JSON.stringify(a);", TypeError, done);
		});

		it("should throw type error for nested circular reference", done => {
			runner.confirmError("var o={};o.a=[];o.a[0]=o;JSON.stringify(o);", TypeError, done);
		});

		it("should replace undefined values with null in sparse array", done => {
			runner.confirmBlock("JSON.stringify([,,])=='[null,null]'", done);
		});

		it("should use an array for replacer if provided", done => {
			runner.confirmBlock("JSON.stringify({foo:'bar',bar:false},['foo'])=='{\"foo\":\"bar\"}';", done);
		});

		it("should serialize a regex as an empty object", done => {
			runner.confirmBlock("JSON.stringify(/abc/)=='{}';", done);
		});

		it("should serialize an Error as an empty object", done => {
			runner.confirmBlock("JSON.stringify(new Error('foo'))=='{}';", done);
		});

		it("should add a space for formatting when provided", done => {
			runner.confirmBlock("JSON.stringify({foo:1},null,2)=='{\\n  \"foo\": 1\\n}';", done);
		});

		it("should add a tab for formatting when provided", done => {
			runner.confirmBlock("JSON.stringify({foo:1},null,'\\t')=='{\\n\\t\"foo\": 1\\n}';", done);
		});
	});

	describe("parse", () => {
		it("should parse null correctly", done => {
			runner.confirmBlock("JSON.parse('null')===null;", done);
		});

		it("should parse number correctly", done => {
			runner.confirmBlock("JSON.parse('1.55')===1.55;", done);
		});

		it("should parse boolean correctly", done => {
			runner.confirmBlock("JSON.parse('true')===true;", done);
		});

		it("should parse string correctly", done => {
			runner.confirmBlock("JSON.parse('\"foo\"')==='foo';", done);
		});

		it("should parse array correctly", done => {
			runner.confirmBlock("JSON.parse('[1,2,3]').length===3;", done);
		});

		it("should parse object correctly", done => {
			runner.confirmBlock("JSON.parse('{\"foo\":true}').foo===true;", done);
		});

		it("should parse with reviver correctly", done => {
			runner.confirmBlock("JSON.parse('{\"foo\":1}', function(k,v){return k=='foo'?v*2:v;}).foo===2;", done);
		});
	});
});