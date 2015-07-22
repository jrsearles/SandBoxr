var runner = require("./test-runner");
var expect = require("chai").expect;

describe("JSON", function () {
	describe("stringify", function () {
		it("should process string as expected", function () {
			var result = runner.runBlock("JSON.stringify('foo')=='\"foo\"'");
			expect(result.value).to.be.true;
		});
		
		it("should process number as expected", function () {
			var result = runner.runBlock("JSON.stringify(123)=='123'");
			expect(result.value).to.be.true;
		});
		
		it("should process boolean as expected", function () {
			var result = runner.runBlock("JSON.stringify(true)=='true'");
			expect(result.value).to.be.true;
		});
		
		it("should process date as expected", function () {
			var result = runner.runBlock("JSON.stringify(new Date(2000,1,1))=='\"2000-02-01T05:00:00.000Z\"';");
			expect(result.value).to.be.true;
		});
		
		it("should process array as expected", function () {
			var result = runner.runBlock("JSON.stringify([42])=='[42]'");
			expect(result.value).to.be.true;
		});
				
		it("should use replacer with array", function () {
			var result = runner.runBlock("JSON.stringify([42], function (k,v) { return v===42?'fourtytwo':v; })=='[\"fourtytwo\"]'");
			expect(result.value).to.be.true;
		});
		
		it("should throw type error for circular object", function () {
			expect(function () {
				runner.runBlock("var o={};o.prop=o;JSON.stringify(o);");
			}).to.throw(TypeError);
		});
					
		it("should throw type error for circular array", function () {
			expect(function () {
				runner.runBlock("var a=[];a[0]=a;JSON.stringify(a);");
			}).to.throw(TypeError);
		});
		
		it("should throw type error for nested circular reference", function () {
			expect(function () {
				runner.runBlock("var o={};o.a=[];o.a[0]=o;JSON.stringify(o);");
			}).to.throw(TypeError);
		});
		
		it("should replace undefined values with null in sparse array", function () {
			var result = runner.runBlock("JSON.stringify([,,])=='[null,null]'");
			expect(result.value).to.be.true;
		});
		
		it("should use an array for replacer if provided", function () {
			var result = runner.runBlock("JSON.stringify({foo:'bar',bar:false},['foo'])=='{\"foo\":\"bar\"}';");
			expect(result.value).to.be.true;
		});
		
		it("should serialize a regex as an empty object", function () {
			var result = runner.runBlock("JSON.stringify(/abc/)=='{}';");
			expect(result.value).to.be.true;
		});
		
		it("should serialize an Error as an empty object", function () {
			var result = runner.runBlock("JSON.stringify(new Error('foo'))=='{}';");
			expect(result.value).to.be.true;
		});
		
		it("should add a space for formatting when provided", function () {
			var result = runner.runBlock("JSON.stringify({foo:1},null,2)=='{\\n  \"foo\": 1\\n}';");
			expect(result.value).to.be.true;
		});
		
		it("should add a tab for formatting when provided", function () {
			var result = runner.runBlock("JSON.stringify({foo:1},null,'\\t')=='{\\n\\t\"foo\": 1\\n}';");
			expect(result.value).to.be.true;
		});
	});
	
	describe("parse", function () {
		it("should parse null correctly", function () {
			var result = runner.runBlock("JSON.parse('null')===null;");
			expect(result.value).to.be.true;
		});
		
		it("should parse number correctly", function () {
			var result = runner.runBlock("JSON.parse('1.55')===1.55;");
			expect(result.value).to.be.true;
		});
			
		it("should parse boolean correctly", function () {
			var result = runner.runBlock("JSON.parse('true')===true;");
			expect(result.value).to.be.true;
		});
				
		it("should parse string correctly", function () {
			var result = runner.runBlock("JSON.parse('\"foo\"')==='foo';");
			expect(result.value).to.be.true;
		});
						
		it("should parse array correctly", function () {
			var result = runner.runBlock("JSON.parse('[1,2,3]').length===3;");
			expect(result.value).to.be.true;
		});
					
		it("should parse object correctly", function () {
			var result = runner.runBlock("JSON.parse('{\"foo\":true}').foo===true;");
			expect(result.value).to.be.true;
		});
						
		it("should parse with reviver correctly", function () {
			var result = runner.runBlock("JSON.parse('{\"foo\":1}', function(k,v){return k=='foo'?v*2:v;}).foo===2;");
			expect(result.value).to.be.true;
		});
	});
});