var runner = require("./test-runner");

describe("Types", function () {
	describe("Objects", function () {
		it("should have a null prototype of prototype", function (done) {
			runner.confirmBlock("Object.prototype.prototype == null", done);
		});

		it("should be able to be created from object literal", function (done) {
			runner.confirmBlock("var a = {};typeof a == 'object';", done);
		});

		it("should have properties assigned in literal", function (done) {
			runner.confirmBlock("var a = { foo: 1 };a.foo==1;", done);
		});

		it("should be able to reference property via bracket notation", function (done) {
			runner.confirmBlock("var a = { foo: 1 };\na['foo'] ==1;", done);
		});

		it("should show `typeof` as 'object'", function (done) {
			runner.confirmBlock("typeof {}=='object';", done);
		});

		it("should show `hasOwnProperty` as true for property", function (done) {
			runner.confirmBlock("var a = { foo: 1 };\na.hasOwnProperty('foo');", done);
		});

		it("should show `typeof` undefined as 'undefined'", function (done) {
			runner.confirmBlock("typeof undefined == 'undefined';", done);
		});

		it("should be able to delete a property", function (done) {
			runner.confirmBlock("var a = { foo: 1 }; delete a.foo; a.foo === undefined;", done);
		});

		it("should be able to delete a property using bracket notation", function (done) {
			runner.confirmBlock("var a = { foo: 1 }; delete a['foo']; a.foo===undefined;", done);
		});

		describe("Object.freeze", function () {
			it("should show isFrozen as false if not frozen", function (done) {
				runner.confirmBlock("!Object.isFrozen({});", done);
			});

			it("should show isFrozen as true if it has been frozen", function (done) {
				runner.confirmBlock("var a = {};Object.freeze(a);Object.isFrozen(a);", done);
			});

			it("should indicate that the object is not extensible", function (done) {
				runner.confirmBlock("var a = {};Object.freeze(a);!Object.isExtensible(a)", done);
			});

			it("should return the object", function (done) {
				runner.confirmBlock("var a = {};a === Object.freeze(a);", done);
			});

			it("should not allow property to be altered", function (done) {
				runner.confirmBlock("var a = { foo: 'bar' };Object.freeze(a);a.foo = 'baz';a.foo=='bar';", done);
			});

			it("should not allow property to be removed", function (done) {
				runner.confirmBlock("var a = { foo: 'bar' };Object.freeze(a);delete a.foo;a.foo=='bar';", done);
			});
		});

		describe("Object.preventExtensions", function () {
			it("Object.preventExtensions returns the object being made non-extensible.", function (done) {
				runner.confirmBlock("var obj = {};var obj2 = Object.preventExtensions(obj);obj === obj2;", done);
			});

			it("Objects are extensible by default.", function (done) {
				runner.confirmBlock("var empty = {};Object.isExtensible(empty);", done);
			});

			it("An object can be made not extensible", function (done) {
				runner.confirmBlock("var empty = {};Object.preventExtensions(empty);Object.isExtensible(empty)===false;", done);
			});

			it("Should not allow new properties to be added after prevent extensions have been applied", function (done) {
				runner.confirmBlock("var obj = {};Object.preventExtensions(obj);obj.foo = 'bar';obj.foo === undefined;", done);
			});
		});

		describe("Object.seal", function () {
			it("should return the object being modified", function (done) {
				runner.confirmBlock("var obj1={};var obj2=Object.seal(obj1);obj1===obj2;", done);
			});

			it("should show isSealed when object is sealed", function (done) {
				runner.confirmBlock("var obj = {};Object.seal(obj);Object.isSealed(obj);", done);
			});

			it("should not show isSealed for unsealed object", function (done) {
				runner.confirmBlock("Object.isSealed({})===false;", done);
			});

			it("should not add new properties to object", function (done) {
				runner.confirmBlock("var obj={};Object.seal(obj);obj.foo='bar';!('foo' in obj);", done);
			});

			it("should allow values to be changed on existing properties", function (done) {
				runner.confirmBlock("var obj={foo:'bar'};Object.seal(obj);obj.foo='baz';obj.foo=='baz';", done);
			});

			it("should not allow properties to be deleted", function (done) {
				runner.confirmBlock("var obj={foo:'bar'};Object.seal(obj);delete obj.foo;obj.hasOwnProperty('foo');", done);
			});
		});

		describe("Object.keys", function () {
			it("should return an array of the objects enumerable properties", function (done) {
				runner.confirmBlock("var a=Object.keys({a:1,b:2,c:3});a[0]=='a'&a[1]=='b'&&a[2]=='c';", done);
			});
		});

		describe("Object.getOwnPropertyNames", function () {
			it("should return an array", function (done) {
				runner.confirmBlock("Array.isArray(Object.getOwnPropertyNames({}));", done);
			});

			it("should return the properties within an object", function (done) {
				runner.confirmBlock("Object.getOwnPropertyNames({foo:1,bar:2}).sort().join()=='bar,foo';", done);
			});

			it("should return expected properties for an array", function (done) {
				runner.confirmBlock("Object.getOwnPropertyNames([1,2,3]).sort().join()=='0,1,2,length';", done);
			});

			it("should throw a TypeError for primitives", function (done) {
				runner.confirmError("Object.getOwnPropertyNames('foo');", TypeError, done);
			});
		});

		describe("Object.defineProperty", function () {
			it("should add the property to the object", function (done) {
				runner.confirmBlock("var a = {}; Object.defineProperty(a, 'foo', { value: 42 }); 'foo' in a;", done);
			});

			it("should set the value if provided", function (done) {
				runner.confirmBlock("var a = {}; Object.defineProperty(a, 'foo', { value: 42 }); a.foo==42;", done);
			});

			it("should allow getter to be defined", function (done) {
				runner.confirmBlock("var a = {}; Object.defineProperty(a, 'foo', { get: function () { return 42; } });a.foo==42;", done);
			});

			it("should allow a setter to be defined", function (done) {
				runner.confirmBlock("var a = {}, realValue = 1; Object.defineProperty(a, 'foo', { get: function () { return realValue; }, set: function (value) { realValue = value * 2; } });a.foo = 21;a.foo==42;", done);
			});

			it("should use the correct context for the getter/setter", function (done) {
				runner.confirmBlock("var a = {foo:true};Object.defineProperty(a, 'bar', { get: function () { return this.foo; } });a.bar==true;", done);
			});
		});

		describe("Object.prototype.toString", function () {
			it("should return expected value", function (done) {
				runner.confirmBlock("({}).toString()=='[object Object]';", done);
			});
		});

		describe("Object.getPrototypeOf", function () {
			it("should return the expected prototype", function (done) {
				runner.confirmBlock("Object.getPrototypeOf({}) === Object.prototype;", done);
			});
		});

		describe("Object.prototype.propertyIsEnumerable", function () {
			it("should return true if the property is enumerable", function (done) {
				runner.confirmBlock("var a={foo:1};a.propertyIsEnumerable('foo');", done);
			});

			it("should return false if the property is not enumerable", function (done) {
				runner.confirmBlock("var a={};Object.defineProperty(a,'foo',{enumerable:false});a.propertyIsEnumerable('foo')===false;", done);
			});

			it("should be callable on a function", function (done) {
				runner.confirmBlock("Object.propertyIsEnumerable('prototype')===false;", done);
			});
		});
	});
});
