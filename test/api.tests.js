import {describe,it} from "mocha";
import {expect} from "chai";
import * as parser from "./ast-parser";
import SandBoxr from "../";

describe("API", () => {
	it("should allow a variable to be defined", done => {
		let env = SandBoxr.createEnvironment();
		env.init();

		let a = env.createVariable("a");
		a.setValue(env.objectFactory.createPrimitive(99));

		let ast = parser.parse("a === 99;");
		let sandbox = SandBoxr.create(ast);
		sandbox.execute(env)
			.then(result => {
				expect(result.value).to.be.true;
				done();
			});
	});

	it("should allow an object to be defined", done => {
		let env = SandBoxr.createEnvironment();
		env.init();

		let obj = env.objectFactory.createObject();
		obj.defineOwnProperty("foo", { value: env.objectFactory.createPrimitive(99) });

		let a = env.createVariable("a");
		a.setValue(obj);

		let ast = parser.parse("a.foo === 99;");
		let sandbox = SandBoxr.create(ast);
		sandbox.execute(env)
			.then(result => {
				expect(result.value).to.be.true;
				done();
			});
	});

	it("should allow function to be removed", done => {
		let env = SandBoxr.createEnvironment();
		env.init();

		env.getValue("String").getValue("prototype").remove("trim");

		let ast = parser.parse("typeof String.prototype.trim === 'undefined';");
		let sandbox = SandBoxr.create(ast);
		sandbox.execute(env)
			.then(result => {
				expect(result.value).to.be.true;
				done();
			});
	});

	it("should allow functions to be added", done => {
		let env = SandBoxr.createEnvironment();
		env.init();

		env.getValue("String").define("concat", env.objectFactory.createFunction(function () {
			let stringValue = "";
			for (let i = 0, ln = arguments.length; i < ln; i++) {
				stringValue += arguments[i].value;
			}

			return env.objectFactory.createPrimitive(stringValue);
		}));

		let ast = parser.parse("String.concat('foo','bar')==='foobar';");
		let sandbox = SandBoxr.create(ast);
		sandbox.execute(env)
			.then(result => {
				expect(result.value).to.be.true;
				done();
			});
	});

	it("should keep variables and values if environment is reused", done => {
		let env = SandBoxr.createEnvironment();
		env.init();

		let a = env.createVariable("a");
		a.setValue(env.objectFactory.createPrimitive(99));

		let ast = parser.parse("a++;");
		let sandbox = SandBoxr.create(ast);

		sandbox.execute(env)
			.then(() => {
				ast = parser.parse("a===100;");
				sandbox = SandBoxr.create(ast);
				return sandbox.execute(env);
			})
			.then(result => {
				expect(result.value).to.be.true;
				done();
			});
	});

	it("should lose variables and values if environment is reinitialized", done => {
		let env = SandBoxr.createEnvironment();
		env.init();

		let a = env.createVariable("a");
		a.setValue(env.objectFactory.createPrimitive(99));

		let ast = parser.parse("a++;");
		let sandbox = SandBoxr.create(ast);
		sandbox.execute(env)
			.then(() => {
				env.init();
				ast = parser.parse("typeof a === 'undefined';");
				sandbox = SandBoxr.create(ast);
				return sandbox.execute(env);
			})
			.then(result => {
				expect(result.value).to.be.true;
				done();
			});
	});

	it("should allow an object to be converted to a native object", done => {
		let ast = parser.parse("({foo:true});");
		let sandbox = SandBoxr.create(ast);
		sandbox.execute().then(result => {
			expect(result.toNative().foo).to.be.true;
			done();
		});
	});

	it("should allow a primitive to be toNativeped", done => {
		let ast = parser.parse("(1);");
		let sandbox = SandBoxr.create(ast);
		sandbox.execute().then(result => {
			expect(result.toNative()).to.equal(1);
			done();
		});
	});

	it("should allow an array to be toNativeped", done => {
		let ast = parser.parse("([1,2,3]);");
		let sandbox = SandBoxr.create(ast);
		sandbox.execute().then(result => {
			expect(result.toNative()[2]).to.equal(3);
			done();
		});
	});

	describe("Exclusions", () => {
		it("should be able to exclude api's", done => {
			let ast = parser.parse("typeof JSON === 'undefined'");
			let sandbox = SandBoxr.create(ast, { exclude: ["JSON"] });
			sandbox.execute().then(result => {
				expect(result.value).to.be.true;
				done();
			});
		});

		it("should be able to exclude methods from prototype", done => {
			let ast = parser.parse("typeof String.prototype.trim === 'undefined'");
			let sandbox = SandBoxr.create(ast, { exclude: ["String.prototype.trim"] });
			sandbox.execute().then(result => {
				expect(result.value).to.be.true;
				done();
			});
		});

		it("should not throw if api does not exist", () => {
			let ast = parser.parse("(1)");
			SandBoxr.create(ast, { exclude: "String.foo.bar" });
		});
	});

	describe("Operators", () => {
		it("should be able to replace an operators", done => {
			let env = SandBoxr.createEnvironment();
			env.init({
				operators: {
					coerciveEquals (a, b) {
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

			let ast = parser.parse("0 == '0'");
			let sandbox = SandBoxr.create(ast);

			sandbox.execute(env).then(result => {
				expect(result.value).to.be.false;

				ast = parser.parse("0 != '0'");
				sandbox = SandBoxr.create(ast);

				return sandbox.execute();
			}).then(result => {
				expect(result.value).to.be.true;
				done();
			});
		});
	});
});