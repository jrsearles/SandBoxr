var ObjectType = require("../types/object-type");
var convert = require("../utils/convert");
var contracts = require("../utils/contracts");
var func = require("../utils/func");

var propertyConfig = { enumerable: false };

function defineProperty (context, obj, name, descriptor) {
	var value = context.scope.global.getValue("undefined");
	var options = { writable: false, enumerable: false, configurable: false };
	var getter, setter;

	if (descriptor) {
		value = descriptor.getValue("value");
		getter = descriptor.getValue("get");
		setter = descriptor.getValue("set");

		if ((value || descriptor.hasProperty("writable")) && (getter || setter)) {
			throw new TypeError("Invalid property. A property cannot both have accessors and be writable or have a value");
		}

		["writable", "enumerable", "configurable"].forEach(function (prop) {
			var propValue = descriptor.getValue(prop);
			if (propValue) {
				options[prop] = propValue.toBoolean() || options[prop];
			}
		});

		// we only keep a copy of the original getter/setter for use with `getOwnPropertyDescriptor`
		if (getter) {
			if (getter.className !== "Function") {
				throw new TypeError("Getter must be a function: " + getter.toString());
			}

			options.writable = true;
			options.get = getter;
			options.getter = function () {
				return func.executeFunction(context, getter, getter.node.params, [], this, getter.node);
			};
		}

		if (setter) {
			if (setter.className !== "Function") {
				throw new TypeError("Setter must be a function: " + setter.toString());
			}

			options.writable = true;
			options.set = setter;
			options.setter = function () {
				return func.executeFunction(context, setter, setter.node.params, arguments, this, setter.node);
			};
		}

		if (value) {
			options.value = value;
		}
	}

	obj.defineOwnProperty(name, value, options);
	//obj.putValue(name, value, options);
}

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var undef = globalScope.getValue("undefined");

	var proto = new ObjectType();
	var objectClass = objectFactory.createFunction(function (value) {
		if (value) {
			if (value.isPrimitive) {
				if (value.value == null) {
					return objectFactory.createObject();
				}

				var objectWrapper = objectFactory.createPrimitive(value.value);
				objectWrapper.type = "object";
				objectWrapper.isPrimitive = false;
				objectWrapper.toBoolean = function () { return true; };
				return objectWrapper;
			}

			// if an object is passed in just return
			return value;
		}

		return objectFactory.createObject();
	}, globalScope, proto, null, { configurable: false, enumerable: false, writable: false });

	// var proto = objectClass.proto;
	proto.defineOwnProperty("hasOwnProperty", objectFactory.createBuiltInFunction(function (name) {
		name = name.toString();
		return objectFactory.createPrimitive(name in this.node.properties);
	}, 1, "Object.prototype.hasOwnProperty"), propertyConfig);

	proto.defineOwnProperty("valueOf", objectFactory.createBuiltInFunction(function () {
		if ("value" in this.node) {
			return objectFactory.createPrimitive(this.node.value);
		}

		return this.node;
	}, 0, "Object.prototype.valueOf"), propertyConfig);

	proto.defineOwnProperty("toString", objectFactory.createBuiltInFunction(function () {
		var obj = this.scope.thisNode;
		return objectFactory.createPrimitive("[object " + obj.className + "]");
	}, 0, "Object.prototype.toString"), propertyConfig);

	proto.defineOwnProperty("toLocaleString", objectFactory.createBuiltInFunction(function () {
		return objectFactory.createPrimitive(this.node.toString());
	}, 0, "Object.prototype.toLocaleString"), propertyConfig);

	proto.defineOwnProperty("isPrototypeOf", objectFactory.createBuiltInFunction(function (obj) {
		var current = obj;
		while (current) {
			if (current === this.scope.thisNode) {
				return objectFactory.createPrimitive(true);
			}

			if (current.parent && current.parent.proto === this.scope.thisNode) {
				return objectFactory.createPrimitive(true);
			}

			current = current.proto; // && current.parent.proto;
		}

		return objectFactory.createPrimitive(false);
	}, 1, "Object.isPrototypeOf"), propertyConfig);

	proto.defineOwnProperty("propertyIsEnumerable", objectFactory.createBuiltInFunction(function (name) {
		var descriptor = this.node.getProperty(name.toString());
		return objectFactory.createPrimitive(!!(descriptor && descriptor.enumerable));
	}, 1, "Object.propertyIsEnumerable"), propertyConfig);

	objectClass.defineOwnProperty("create", objectFactory.createBuiltInFunction(function (parent, descriptors) {
		if (parent && parent.isPrimitive && parent.value !== null) {
			throw new TypeError("Object prototype may only be an Object or null:" + parent.toString());
		}

		if (descriptors && descriptors.isPrimitive && descriptors.value == null) {
			throw new TypeError("Cannot convert null or undefined to object");
		}

		var obj = objectFactory.createObject();

		if (parent) {
			obj.setProto(parent);
		}

		if (descriptors) {
			for (var prop in descriptors.properties) {
				if (descriptors.properties[prop].enumerable) {
					defineProperty(this, obj, prop, descriptors.getValue(prop));
				}
			}
		}

		return obj;
	}, 2, "Object.create"), propertyConfig);

	objectClass.defineOwnProperty("defineProperty", objectFactory.createBuiltInFunction(function (obj, prop, descriptor) {
		defineProperty(this, obj, prop.toString(), descriptor);
	}, 3, "Object.defineProperty"), propertyConfig);

	objectClass.defineOwnProperty("defineProperties", objectFactory.createBuiltInFunction(function (obj, descriptors) {
		for (var prop in descriptors.properties) {
			if (descriptors.properties[prop].enumerable) {
				defineProperty(this, obj, prop, descriptors.getValue(prop));
			}
		}
	}, 2, "Object.defineProperties"), propertyConfig);

	objectClass.defineOwnProperty("getOwnPropertyDescriptor", objectFactory.createBuiltInFunction(function (obj, prop) {
		contracts.assertIsObject(obj, "Object.getOwnPropertyDescriptor");

		prop = convert.toPrimitive(this, prop, "string");

		if (obj.hasOwnProperty(prop)) {
			var descriptor = obj.getProperty(prop);

			var result = objectFactory.createObject();
			result.putValue("configurable", objectFactory.createPrimitive(descriptor.configurable));
			result.putValue("enumerable", objectFactory.createPrimitive(descriptor.enumerable));

			if (descriptor.get || descriptor.set) {
				result.putValue("get", descriptor.get || undef);
				result.putValue("set", descriptor.set || undef);
			} else {
				result.putValue("value", descriptor.value);
				result.putValue("writable", objectFactory.createPrimitive(descriptor.writable));
			}

			return result;
		}

		return undef;
	}, 2, "Object.getOwnPropertyDescriptor"), propertyConfig);

	objectClass.defineOwnProperty("keys", objectFactory.createBuiltInFunction(function (obj) {
		var arr = objectFactory.create("Array");
		var index = 0;

		Object.keys(obj.properties).forEach(function (name) {
			if (obj.properties[name].enumerable) {
				arr.putValue(index++, objectFactory.createPrimitive(name));
			}
		});

		return arr;
	}, 1, "Object.keys"), propertyConfig);

	objectClass.defineOwnProperty("getOwnPropertyNames", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.getOwnPropertyNames");

		var arr = objectFactory.create("Array");
		var i = 0;

		for (var prop in obj.properties) {
			// ignore prototype
			if (prop !== "prototype") {
				arr.putValue(i++, objectFactory.createPrimitive(prop));
			}
		}

		return arr;
	}, 1, "Object.getOwnPropertyNames"), propertyConfig);

	objectClass.defineOwnProperty("getPrototypeOf", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.getPrototypeOf");
		return obj.parent && obj.parent.proto;
	}, 1, "Object.getPrototypeOf"), propertyConfig);

	objectClass.defineOwnProperty("freeze", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.freeze");
		obj.freeze();
		return obj;
	}, 1, "Object.freeze"), propertyConfig);

	objectClass.defineOwnProperty("isFrozen", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.isFrozen");
		return objectFactory.createPrimitive(obj.isPrimitive || obj.frozen);
	}, 1, "Object.isFrozen"), propertyConfig);

	objectClass.defineOwnProperty("preventExtensions", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.preventExtensions");
		obj.preventExtensions();
		return obj;
	}, 1, "Object.preventExtensions"), propertyConfig);

	objectClass.defineOwnProperty("isExtensible", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.isExtensible");
		return objectFactory.createPrimitive(obj.extensible !== false);
	}, 1, "Object.isExtensible"), propertyConfig);

	objectClass.defineOwnProperty("seal", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.seal");
		obj.seal();
		return obj;
	}, 1, "Object.seal"), propertyConfig);

	objectClass.defineOwnProperty("isSealed", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.isSealed");
		return objectFactory.createPrimitive(obj.sealed);
	}, 1, "Object.isSealed"), propertyConfig);

	globalScope.getValue("Function").parent = objectClass;
	globalScope.defineOwnProperty("Object", objectClass, propertyConfig);
};
