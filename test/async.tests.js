// import SandBoxr from "../src";
var SandBoxr = require("../dist/sandboxr");
var expect = require("chai").expect;
var parser = require("./ast-parser");
var Promise = require("core-js/es6/promise");

describe("Async", function () {
	it("should accept promises for returned values", function (done) {
		var env = SandBoxr.createEnvironment();
		env.init();

		var foo = env.objectFactory.createFunction(function () {
			var promise = new Promise(function (resolve) {
				setTimeout(function () {
					var result = env.objectFactory.createPrimitive(50);
					resolve(result);
				}, 4);
			});
			
			return promise;
		});
		
		env.global.define("foo", foo);
		
		var ast = parser.parse("foo()===50;");
		var sandbox = SandBoxr.create(ast);
		var result = sandbox.execute(env);
		
		result.then(function (value) {
			expect(value.unwrap()).to.be.true;
			done();
		});
	});
	
	it("should return a promise as a result", function (done) {
		var ast = parser.parse("true===true;");
		var sandbox = SandBoxr.create(ast);
		
		sandbox.execute().then(function (value) {
			expect(value.unwrap()).to.be.true;
			done();
		});
	});
});