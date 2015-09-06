// import SandBoxr from "../";
var SandBoxr = require("../dist/sandboxr");
var parser = require("./ast-parser");
var expect = require("chai").expect;

describe("API", function () {
	it("should allow a variable to be defined", function (done) {
		var env = SandBoxr.createEnvironment();
		env.init();

		var a = env.createVariable("a");
		a.setValue(env.objectFactory.createPrimitive(99));

		var ast = parser.parse("a === 99;");
		var sandbox = SandBoxr.create(ast);
		sandbox.execute(env)
			.then(function (result) {
				expect(result.value).to.be.true;
				done();
			});
	});

	it("should allow an object to be defined", function (done) {
		var env = SandBoxr.createEnvironment();
		env.init();

		var obj = env.objectFactory.createObject();
		obj.defineOwnProperty("foo", { value: env.objectFactory.createPrimitive(99) });

		var a = env.createVariable("a");
		a.setValue(obj);

		var ast = parser.parse("a.foo === 99;");
		var sandbox = SandBoxr.create(ast);
		sandbox.execute(env)
			.then(function (result) {
				expect(result.value).to.be.true;
				done();
			});
	});

	it("should allow function to be removed", function (done) {
		var env = SandBoxr.createEnvironment();
		env.init();

		env.getValue("String").getValue("prototype").remove("trim");

		var ast = parser.parse("typeof String.prototype.trim === 'undefined';");
		var sandbox = SandBoxr.create(ast);
		sandbox.execute(env)
			.then(function (result) {
				expect(result.value).to.be.true;
				done();
			});
	});

	it("should allow functions to be added", function (done) {
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
		sandbox.execute(env)
			.then(function (result) {
				expect(result.value).to.be.true;
				done();
			});
	});

	it("should keep variables and values if environment is reused", function (done) {
		var env = SandBoxr.createEnvironment();
		env.init();

		var a = env.createVariable("a");
		a.setValue(env.objectFactory.createPrimitive(99));

		var ast = parser.parse("a++;");
		var sandbox = SandBoxr.create(ast);

		sandbox.execute(env)
			.then(function () {
				ast = parser.parse("a===100;");
				sandbox = SandBoxr.create(ast);
				return sandbox.execute(env);
			})
			.then(function (result) {
				expect(result.value).to.be.true;
				done();
			});
	});

	it("should lose variables and values if environment is reinitialized", function (done) {
		var env = SandBoxr.createEnvironment();
		env.init();

		var a = env.createVariable("a");
		a.setValue(env.objectFactory.createPrimitive(99));

		var ast = parser.parse("a++;");
		var sandbox = SandBoxr.create(ast);
		sandbox.execute(env)
			.then(function () {
				env.init();
				ast = parser.parse("typeof a === 'undefined';");
				sandbox = SandBoxr.create(ast);
				return sandbox.execute(env);
			})
			.then(function (result) {
				expect(result.value).to.be.true;
				done();
			});
	});

	it("should allow an object to be converted to a unwrapped object", function (done) {
		var ast = parser.parse("({foo:true});");
		var sandbox = SandBoxr.create(ast);
		sandbox.execute().then(function (result) {
			expect(result.unwrap().foo).to.be.true;
			done();
		});
	});

	it("should allow a primitive to be unwrapped", function (done) {
		var ast = parser.parse("(1);");
		var sandbox = SandBoxr.create(ast);
		sandbox.execute().then(function (result) {
			expect(result.unwrap()).to.equal(1);
			done();
		});
	});

	it("should allow an array to be unwrapped", function (done) {
		var ast = parser.parse("([1,2,3]);");
		var sandbox = SandBoxr.create(ast);
		sandbox.execute().then(function (result) {
			expect(result.unwrap()[2]).to.equal(3);
			done();
		});
	});

	describe("Exclusions", function () {
		it("should be able to exclude api's", function (done) {
			var ast = parser.parse("typeof JSON === 'undefined'");
			var sandbox = SandBoxr.create(ast, { exclude: ["JSON"] });
			sandbox.execute().then(function (result) {
				expect(result.value).to.be.true;
				done();
			});
		});

		it("should be able to exclude methods from prototype", function (done) {
			var ast = parser.parse("typeof String.prototype.trim === 'undefined'");
			var sandbox = SandBoxr.create(ast, { exclude: ["String.prototype.trim"] });
			sandbox.execute().then(function (result) {
				expect(result.value).to.be.true;
				done();
			});
		});

		it("should not throw if api does not exist", function () {
			var ast = parser.parse("(1)");
			SandBoxr.create(ast, { exclude: "String.foo.bar" });
		});
	});

	describe("Operators", function () {
		it("should be able to replace an operators", function (done) {
			var env = SandBoxr.createEnvironment();
			env.init({
				comparers: {
					"implicitEquals": function (env, a, b) {
						if (a.isPrimitive && b.isPrimitive) {
							return a.value === b.value;
						}

						if (a.isPrimitive || b.isPrimitive) {
							return false;
						}

						return a === b;
					}
				}
			});

			var ast = parser.parse("0 == '0'");
			var sandbox = SandBoxr.create(ast);

			sandbox.execute(env).then(function (result) {
				expect(result.value).to.be.false;

				ast = parser.parse("0 != '0'");
				sandbox = SandBoxr.create(ast);

				return sandbox.execute();
			}).then(function (result) {
				expect(result.value).to.be.true;
				done();
			});
		});
	});
});