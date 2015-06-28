var runner = require("./test-runner");
var expect = require("chai").expect;

describe("Types", function () {
	describe("Objects", function () {
		it("should have a null prototype of prototype", function () {
			var result = runner.runBlock("Object.prototype.prototype == null");
			expect(result.value).to.be.true;
		});

		it("should be able to be created from object literal", function () {
			var scope = runner.getScope("var a = {};");
			expect(scope.getValue("a").type).to.equal("object");
		});

		it("should have properties assigned in literal", function () {
			var scope = runner.getScope("var a = { foo: 1 };");
			expect(scope.getValue("a").getValue("foo").value).to.equal(1);
		});

		it("should be able to reference property with dot notation", function () {
			var result = runner.runBlock("var a = { foo: 1 };\na.foo;");
			expect(result.value).to.equal(1);
		});

		it("should be able to reference property via bracket notation", function () {
			var result = runner.runBlock("var a = { foo: 1 };\na['foo'];");
			expect(result.value).to.equal(1);
		});

		it("should show `typeof` as 'object'", function () {
			var result = runner.runBlock("typeof {};");
			expect(result.value).to.equal("object");
		});

		it("should show `hasOwnProperty` as true for property", function () {
			var result = runner.runBlock("var a = { foo: 1 };\na.hasOwnProperty('foo');");
			expect(result.value).to.be.true;
		});

		it("should show `typeof` undefined as 'undefined'", function () {
			var result = runner.runBlock("typeof undefined;");
			expect(result.value).to.equal("undefined");
		});

		it("should be able to delete a property", function () {
			var result = runner.runBlock("var a = { foo: 1 }; delete a.foo; a.foo;");
			expect(result.value).to.be.undefined;
		});

		it("should be able to delete a property using bracket notation", function () {
			var result = runner.runBlock("var a = { foo: 1 }; delete a['foo']; a.foo;");
			expect(result.value).to.be.undefined;
		});

		describe("Object.freeze", function () {
			it("should show isFrozen as false if not frozen", function () {
				var result = runner.runBlock("Object.isFrozen({});");
				expect(result.value).to.be.false;
			});

			it("should show isFrozen as true if it has been frozen", function () {
				var result = runner.runBlock("var a = {};Object.freeze(a);Object.isFrozen(a);");
				expect(result.value).to.be.true;
			});

			it("should indicate that the object is not extensible", function () {
				var result = runner.runBlock("var a = {};Object.freeze(a);Object.isExtensible(a)");
				expect(result.value).to.be.false;
			});

			it("should return the object", function () {
				var result = runner.runBlock("var a = {};a === Object.freeze(a);");
				expect(result.value).to.be.true;
			});

			it("should not allow property to be altered", function () {
				var scope = runner.getScope("var a = { foo: 'bar' };Object.freeze(a);a.foo = 'baz';");
				expect(scope.getValue("a").getValue("foo").value).to.equal("bar");
			});

			it("should not allow property to be removed", function () {
				var scope = runner.getScope("var a = { foo: 'bar' };Object.freeze(a);delete a.foo;");
				expect(scope.getValue("a").getValue("foo").value).to.equal("bar");
			});
		});

		describe("Object.preventExtensions", function () {
			it("Object.preventExtensions returns the object being made non-extensible.", function () {
				var result = runner.runBlock("var obj = {};var obj2 = Object.preventExtensions(obj);obj === obj2;");
				expect(result.value).to.be.true;
			});

			it("Objects are extensible by default.", function () {
				var result = runner.runBlock("var empty = {};Object.isExtensible(empty);");
				expect(result.value).to.be.true;
			});

			it("An object can be made not extensible", function () {
				var result = runner.runBlock("var empty = {};Object.preventExtensions(empty);Object.isExtensible(empty);");
				expect(result.value).to.be.false;
			});

			it("Should not allow new properties to be added after prevent extensions have been applied", function () {
				var scope = runner.getScope("var obj = {};Object.preventExtensions(obj);obj.foo = 'bar';");
				expect(scope.getValue("obj").getValue("foo")).to.be.undefined;
			});
		});

		describe("Object.seal", function () {
			it("should return the object being modified", function () {
				var result = runner.runBlock("var obj1={};var obj2=Object.seal(obj1);obj1===obj2;");
				expect(result.value).to.be.true;
			});

			it("should show isSealed when object is sealed", function () {
				var result = runner.runBlock("var obj = {};Object.seal(obj);Object.isSealed(obj);");
				expect(result.value).to.be.true;
			});

			it("should not show isSealed for unsealed object", function () {
				var result = runner.runBlock("Object.isSealed({});");
				expect(result.value).to.be.false;
			});

			it("should not add new properties to object", function () {
				var result = runner.runBlock("var obj={};Object.seal(obj);obj.foo='bar';'foo' in obj;");
				expect(result.value).to.be.false;
			});

			it("should allow values to be changed on existing properties", function () {
				var result = runner.runBlock("var obj={foo:'bar'};Object.seal(obj);obj.foo='baz';obj.foo;");
				expect(result.value).to.equal("baz");
			});

			it("should not allow properties to be deleted", function () {
				var result = runner.runBlock("var obj={foo:'bar'};Object.seal(obj);delete obj.foo;obj.hasOwnProperty('foo');");
				expect(result.value).to.be.true;
			});
		});

		describe("Object.keys", function () {
			it("should return an array of the objects enumerable properties", function () {
				var result = runner.runBlock("Object.keys({a:1,b:2,c:3});");
				expect(result.getValue(0).value).to.equal("a");
				expect(result.getValue(1).value).to.equal("b");
				expect(result.getValue(2).value).to.equal("c");
			});
		});

		describe("Object.getOwnPropertyNames", function () {
			it("should return an array", function () {
				var result = runner.runBlock("Array.isArray(Object.getOwnPropertyNames({}));");
				expect(result.value).to.be.true;
			});

			it("should return the properties within an object", function () {
				var result = runner.runBlock("Object.getOwnPropertyNames({foo:1,bar:2}).sort().join();");
				expect(result.value).to.equal("bar,foo");
			});

			it("should return expected properties for an array", function () {
				var result = runner.runBlock("Object.getOwnPropertyNames([1,2,3]).sort().join();");
				expect(result.value).to.equal("0,1,2,length");
			});

			it("should throw a TypeError for primitives", function () {
				expect(function () {
					runner.runBlock("Object.getOwnPropertyNames('foo');");
				}).to.throw(TypeError);
			});
		});

		describe("Object.defineProperty", function () {
			it("should add the property to the object", function () {
				var result = runner.runBlock("var a = {}; Object.defineProperty(a, 'foo', { value: 42 }); 'foo' in a;");
				expect(result.value).to.be.true;
			});

			it("should set the value if provided", function () {
				var result = runner.runBlock("var a = {}; Object.defineProperty(a, 'foo', { value: 42 }); a.foo;");
				expect(result.value).to.equal(42);
			});

			it("should allow getter to be defined", function () {
				var result = runner.runBlock("var a = {}; Object.defineProperty(a, 'foo', { get: function () { return 42; } });a.foo;");
				expect(result.value).to.equal(42);
			});

			it("should allow a setter to be defined", function () {
				var result = runner.runBlock("var a = {}, realValue = 1; Object.defineProperty(a, 'foo', { get: function () { return realValue; }, set: function (value) { realValue = value * 2; } });a.foo = 21;a.foo");
				expect(result.value).to.equal(42);
			});

			it("should use the correct context for the getter/setter", function () {
				var result = runner.runBlock("var a = {foo:true};Object.defineProperty(a, 'bar', { get: function () { return this.foo; } });a.bar;");
				expect(result.value).to.be.true;
			});
		});

		describe("Object.prototype.toString", function () {
			it("should return expected value", function () {
				var result = runner.runBlock("({}).toString();");
				expect(result.value).to.equal("[object Object]");
			});
		});

		describe("Object.getPrototypeOf", function () {
			it("should return the expected prototype", function () {
				var result = runner.runBlock("Object.getPrototypeOf({}) === Object.prototype;");
				expect(result.value).to.be.true;
			});
		});

		describe("Object.prototype.propertyIsEnumerable", function () {
			it("should return true if the property is enumerable", function () {
				var result = runner.runBlock("var a={foo:1};a.propertyIsEnumerable('foo');");
				expect(result.value).to.be.true;
			});

			it("should return false if the property is not enumerable", function () {
				var result = runner.runBlock("var a={};Object.defineProperty(a,'foo',{enumerable:false});a.propertyIsEnumerable('foo');");
				expect(result.value).to.be.false;
			});

			it("should be callable on a function", function () {
				var result = runner.runBlock("Object.propertyIsEnumerable('prototype');");
				expect(result.value).to.be.false;
			});
		});
	});
});
