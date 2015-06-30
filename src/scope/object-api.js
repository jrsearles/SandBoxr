var ObjectType = require("../types/object-type");
var convert = require("../utils/convert");
var contracts = require("../utils/contracts");
var func = require("../utils/func");

var propertyConfig = { configurable: true, enumerable: false, writable: true };

function isObject (obj) {
	if (!obj) {
		return false;
	}

	if (obj.isPrimitive) {
		return obj.value && obj.type === "object";
	}

	return true;
}

function defineProperty (context, obj, name, descriptor) {
	if (!isObject(descriptor)) {
		throw new TypeError("Property description must be an object: " + (descriptor ? descriptor.toString() : "undefined"));
	}

	var undef = context.scope.global.getValue("undefined");
	var options = {};  // { writable: false, enumerable: false, configurable: false };

	if (descriptor) {
		var hasValue = descriptor.hasProperty("value");
		var hasGetter = descriptor.hasProperty("get");
		var hasSetter = descriptor.hasProperty("set");

		if ((hasValue || descriptor.hasProperty("writable")) && (hasGetter || hasSetter)) {
			throw new TypeError("Invalid property. A property cannot both have accessors and be writable or have a value");
		}

		["writable", "enumerable", "configurable"].forEach(function (prop) {
			if (descriptor.hasProperty(prop)) {
				var attrValue = descriptor.getValue(prop);
				options[prop] = !!(attrValue && attrValue.toBoolean());
			}
		});

		// we only keep a copy of the original getter/setter for use with `getOwnPropertyDescriptor`
		if (hasGetter) {
			var getter = descriptor.getValue("get") || undef;
			if (getter.isPrimitive && getter.value === undefined) {
				options.get = options.getter = undefined;
			} else {
				if (getter.className !== "Function") {
					throw new TypeError("Getter must be a function: " + getter.toString());
				}

				options.get = getter;
				options.getter = function () {
					var getResult = func.getFunctionResult(context, getter, getter.node.params, [], this, getter.node);
					return getResult && getResult.exit ? getResult.result : undef;
				};
			}
		}

		if (hasSetter) {
			var setter = descriptor.getValue("set") || undef;
			if (setter.isPrimitive && setter.value === undefined) {
				options.set = options.setter = undefined;
			} else {
				if (setter.className !== "Function") {
					throw new TypeError("Setter must be a function: " + setter.toString());
				}

				options.set = setter;
				options.setter = function () {
					return func.executeFunction(context, setter, setter.node.params, arguments, this, setter.node);
				};
			}
		}

		if (hasValue) {
			options.value = descriptor.getValue("value") || undef;
		}
	}

	obj.defineOwnProperty(name, null, options, true, context);
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
		// if ("value" in this.node) {
		// 	return objectFactory.createPrimitive(this.node.value);
		// }

		return this.node;
	}, 0, "Object.prototype.valueOf"), propertyConfig);

	var toStringFunc = objectFactory.createBuiltInFunction(function () {
		var obj = this.scope.thisNode;
		return objectFactory.createPrimitive("[object " + obj.className + "]");
	}, 0, "Object.prototype.toString");

	// Object.prototype.toString === Object.prototype.toLocaleString
	proto.defineOwnProperty("toString", toStringFunc, propertyConfig);
	proto.defineOwnProperty("toLocaleString", toStringFunc, propertyConfig);

	proto.defineOwnProperty("isPrototypeOf", objectFactory.createBuiltInFunction(function (obj) {
		var current = obj;
		while (current) {
			if (this.scope.thisNode === current || this.scope.thisNode === (current.parent && current.parent.proto)) {
				return objectFactory.createPrimitive(true);
			}

			current = current.getValue("prototype");

			// if (current.parent && current.parent.proto === this.scope.thisNode) {
			// 	return objectFactory.createPrimitive(true);
			// }

			// current = current.proto; // && current.parent.proto;
		}

		return objectFactory.createPrimitive(false);
	}, 1, "Object.isPrototypeOf"), propertyConfig);

	proto.defineOwnProperty("propertyIsEnumerable", objectFactory.createBuiltInFunction(function (name) {
		name = convert.toPrimitive(this, name, "string");
		var descriptor = this.node.getOwnProperty(name);
		return objectFactory.createPrimitive(!!(descriptor && descriptor.enumerable));
	}, 1, "Object.propertyIsEnumerable"), propertyConfig);

	objectClass.defineOwnProperty("create", objectFactory.createBuiltInFunction(function (parent, descriptors) {
		if (parent && parent.isPrimitive && parent.value !== null) {
			throw new TypeError("Object prototype may only be an Object or null:" + parent.toString());
		}

		if (descriptors && descriptors.isPrimitive && descriptors.value === null) {
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
		contracts.assertIsObject(obj, "Object.defineProperty");
		defineProperty(this, obj, convert.toPrimitive(this, prop, "string"), descriptor);
		return obj;
	}, 3, "Object.defineProperty"), propertyConfig);

	objectClass.defineOwnProperty("defineProperties", objectFactory.createBuiltInFunction(function (obj, descriptors) {
		contracts.assertIsObject(obj, "Object.defineProperties");
		contracts.assertArgIsNotNullOrUndefined(descriptors);

		for (var prop in descriptors.properties) {
			if (descriptors.properties[prop].enumerable) {
				defineProperty(this, obj, prop, descriptors.getValue(prop));
			}
		}

		return obj;
	}, 2, "Object.defineProperties"), propertyConfig);

	objectClass.defineOwnProperty("getOwnPropertyDescriptor", objectFactory.createBuiltInFunction(function (obj, prop) {
		contracts.assertIsObject(obj, "Object.getOwnPropertyDescriptor");

		prop = convert.toPrimitive(this, prop, "string");

		if (obj.hasOwnProperty(prop)) {
			var descriptor = obj.getProperty(prop);

			var result = objectFactory.createObject();
			result.putValue("configurable", objectFactory.createPrimitive(descriptor.configurable), false, this);
			result.putValue("enumerable", objectFactory.createPrimitive(descriptor.enumerable), false, this);

			if (descriptor.dataProperty) {
				result.putValue("value", descriptor.value, false, this);
				result.putValue("writable", objectFactory.createPrimitive(descriptor.writable), false, this);
			} else {
				result.putValue("get", descriptor.get || undef, false, this);
				result.putValue("set", descriptor.set || undef, false, this);
			}

			return result;
		}

		return undef;
	}, 2, "Object.getOwnPropertyDescriptor"), propertyConfig);

	objectClass.defineOwnProperty("keys", objectFactory.createBuiltInFunction(function (obj) {
		var arr = objectFactory.create("Array");
		var index = 0;
		var context = this;

		Object.keys(obj.properties).forEach(function (name) {
			if (obj.properties[name].enumerable) {
				arr.putValue(index++, objectFactory.createPrimitive(name), false, context);
			}
		});

		return arr;
	}, 1, "Object.keys"), propertyConfig);

	objectClass.defineOwnProperty("getOwnPropertyNames", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.getOwnPropertyNames");

		var arr = objectFactory.create("Array");
		obj.getOwnPropertyNames().forEach(function (name, index) {
			arr.putValue(index, objectFactory.createPrimitive(name));
		});

		return arr;
	}, 1, "Object.getOwnPropertyNames"), propertyConfig);

	objectClass.defineOwnProperty("getPrototypeOf", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.getPrototypeOf");
		return obj.parent && obj.parent.proto || obj.proto || globalScope.getValue("null");
	}, 1, "Object.getPrototypeOf"), propertyConfig);

	objectClass.defineOwnProperty("freeze", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.freeze");

		obj.freeze();
		return obj;
	}, 1, "Object.freeze"), propertyConfig);

	objectClass.defineOwnProperty("isFrozen", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.isFrozen");

		if (obj.isPrimitive) {
			return objectFactory.createPrimitive(true);
		}

		if (!obj.extensible) {
			for (var prop in obj.properties) {
				if (obj.type === "function" || prop !== "prototype") {
					if (obj.properties[prop].writable || obj.properties[prop].configurable) {
						return objectFactory.createPrimitive(false);
					}
				}
			}
		}

		return objectFactory.createPrimitive(!obj.extensible);
	}, 1, "Object.isFrozen"), propertyConfig);

	objectClass.defineOwnProperty("preventExtensions", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.preventExtensions");
		obj.preventExtensions();
		return obj;
	}, 1, "Object.preventExtensions"), propertyConfig);

	objectClass.defineOwnProperty("isExtensible", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.isExtensible");
		return objectFactory.createPrimitive(obj.extensible);
	}, 1, "Object.isExtensible"), propertyConfig);

	objectClass.defineOwnProperty("seal", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.seal");
		obj.seal();
		return obj;
	}, 1, "Object.seal"), propertyConfig);

	objectClass.defineOwnProperty("isSealed", objectFactory.createBuiltInFunction(function (obj) {
		contracts.assertIsObject(obj, "Object.isSealed");

		if (!obj.extensible) {
			for (var prop in obj.properties) {
				if (obj.type === "function" || prop !== "prototype") {
					if (obj.properties[prop].configurable) {
						return objectFactory.createPrimitive(false);
					}
				}
			}
		}

		return objectFactory.createPrimitive(!obj.extensible);
	}, 1, "Object.isSealed"), propertyConfig);

	globalScope.getValue("Function").parent = objectClass;
	globalScope.defineOwnProperty("Object", objectClass, propertyConfig);
};
