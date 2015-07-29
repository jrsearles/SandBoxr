var SandBoxr = require("../src/");
var parser = require("./ast-parser");
var runner = require("./test-runner");
var expect = require("chai").expect;

describe("API", function () {
	it("should allow a variable to be defined", function () {
		var env = SandBoxr.createEnvironment();
		env.init();
		
		var a = env.createVariable("a");
		a.setValue(env.objectFactory.createPrimitive(99));
		
		var ast = parser.parse("a === 99;");
		var sandbox = SandBoxr.create(ast);
		var result = sandbox.execute(env);
		
		expect(result.result.value).to.be.true;
	});
	
	it("should allow an object to be defined", function () { 
		var env = SandBoxr.createEnvironment();
		env.init();

		var obj = env.objectFactory.createObject();
		obj.defineOwnProperty("foo", { value: env.objectFactory.createPrimitive(99) });
		
		var a = env.createVariable("a");
		a.setValue(obj);
		
		var ast = parser.parse("a.foo === 99;");
		var sandbox = SandBoxr.create(ast);
		var result = sandbox.execute(env);
		
		expect(result.result.value).to.be.true;
	});
	
	it("should allow function to be removed", function () {
		var env = SandBoxr.createEnvironment();
		env.init();

		env.getValue("String").getValue("prototype").remove("trim");
		
		var ast = parser.parse("typeof String.prototype.trim === 'undefined';");
		var sandbox = SandBoxr.create(ast);
		var result = sandbox.execute(env);
		
		expect(result.result.value).to.be.true;
	});
	
	it("should allow functions to be added", function () {
		var env = SandBoxr.createEnvironment();
		env.init();

		env.getValue("String").define("concat", env.objectFactory.createFunction(function () {
			var stringValue = "";
			for (var i = 0, ln = arguments.length; i < ln; i++) {
				stringValue += arguments[i].value;
			}
			
			return env.objectFactory.createPrimitive(stringValue);
		}));
		
		var ast = parser.parse("String.concat('foo','bar')==='foobar';");
		var sandbox = SandBoxr.create(ast);
		var result = sandbox.execute(env);
		
		expect(result.result.value).to.be.true;
	});
	
	it("should keep variables and values if environment is reused", function () {
		var env = SandBoxr.createEnvironment();
		env.init();
		
		var a = env.createVariable("a");
		a.setValue(env.objectFactory.createPrimitive(99));
		
		var ast = parser.parse("a++;");
		var sandbox = SandBoxr.create(ast);
		sandbox.execute(env);
		
		ast = parser.parse("a===100;");
		sandbox = SandBoxr.create(ast);
		var result = sandbox.execute(env);
		
		expect(result.result.value).to.be.true;
	});
	
	it("should lose variables and values if environment is reinitialized", function () {
		var env = SandBoxr.createEnvironment();
		env.init();
		
		var a = env.createVariable("a");
		a.setValue(env.objectFactory.createPrimitive(99));
		
		var ast = parser.parse("a++;");
		var sandbox = SandBoxr.create(ast);
		sandbox.execute(env);
		
		env.init();
		ast = parser.parse("typeof a === 'undefined';");
		sandbox = SandBoxr.create(ast);
		var result = sandbox.execute(env);
		
		expect(result.result.value).to.be.true;
	});
});