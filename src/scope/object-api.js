var objectFactory = require("../types/object-factory");
var utils = require("../utils");

var propertyConfig = { enumerable: false };

function verifyObject (obj, source) {
	if (!obj || obj.isPrimitive) {
		throw new TypeError(source + " called on non-object");
	}
}

function defineProperty (context, obj, name, descriptor) {
	var value = objectFactory.scope.getProperty("undefined");
	var options = { writable: false, enumerable: false, configurable: false };
	var getter, setter;

	if (descriptor) {
		["writable", "enumerable", "configurable"].forEach(function (prop) {
			var propValue = descriptor.getProperty(prop);
			if (propValue) {
				options[prop] = propValue.value || options[prop];
			}
		});

		value = descriptor.getProperty("value");
		getter = descriptor.getProperty("get");
		setter = descriptor.getProperty("set");

		// we only keep a copy of the original getter/setter for use with `getOwnPropertyDescriptor`
		if (getter) {
			options.writable = true;
			options.get = getter;
			options.getter = function () {
				return utils.executeFunction(context, getter, getter.node.params, [], this, getter.node);
			};
		}

		if (setter) {
			options.writable = true;
			options.set = setter;
			options.setter = function () {
				return utils.executeFunction(context, setter, setter.node.params, arguments, this, setter.node);
			};
		}

		if (value) {
			options.value = value;
		}
	}

	obj.setProperty(name, value, options);
}

module.exports = function (globalScope) {
	var undef = globalScope.getProperty("undefined");

	var objectClass = objectFactory.createFunction(function (value) {
		if (value) {
			if (value.isPrimitive) {
				value.type = "object";
				value.isPrimitive = false;
				// var obj = this.isNew ? this.node : objectFactory.createObject();
				// if (value.value == null) {
				// 	return obj;
				// }

				// return utils.createWrappedPrimitive(obj, value.value);
			}

			// if an object is passed in just return
			return value;
		}

		return objectFactory.createObject();
	});

	var proto = objectClass.proto;
	proto.defineProperty("hasOwnProperty", objectFactory.createFunction(function (name) {
		name = name.toString();
		return objectFactory.createPrimitive(name in this.node.properties);
	}), propertyConfig);

	proto.defineProperty("valueOf", objectFactory.createFunction(function () {
		if ("value" in this.node) {
			return objectFactory.createPrimitive(this.node.value);
		}

		return this.node;
	}), propertyConfig);

	proto.defineProperty("toString", objectFactory.createFunction(function () {
		var obj = this.scope.thisNode;
		return objectFactory.createPrimitive("[object " + obj.className + "]");
	}), propertyConfig);

	proto.defineProperty("toLocaleString", objectFactory.createFunction(function () {
		return objectFactory.createPrimitive(this.node.toString());
	}), propertyConfig);

	proto.defineProperty("isPrototypeOf", objectFactory.createFunction(function (obj) {
		var current = obj;
		while (current) {
			if (current === this.scope.thisNode) {
				return objectFactory.createPrimitive(true);
			}

			current = current.proto;
		}

		return objectFactory.createPrimitive(false);
	}), propertyConfig);

	proto.defineProperty("propertyIsEnumerable", objectFactory.createFunction(function (name) {
		var descriptor = this.node.getPropertyDescriptor(name.toString());
		return objectFactory.createPrimitive(!!(descriptor && descriptor.enumerable));
	}), propertyConfig);

	objectClass.defineProperty("create", objectFactory.createFunction(function (parent, properties) {
		var obj = objectFactory.createObject();

		if (parent) {
			obj.setProto(parent.proto);
		}

		return obj;
	}), propertyConfig);

	objectClass.defineProperty("defineProperty", objectFactory.createFunction(function (obj, prop, descriptor) {
		defineProperty(this, obj, prop.toString(), descriptor);
	}), propertyConfig);

	objectClass.defineProperty("defineProperties", objectFactory.createFunction(function (obj, descriptors) {
		for (var prop in descriptors.properties) {
			if (descriptors.properties[prop].enumerable) {
				defineProperty(this, obj, prop, descriptors.getProperty(prop));
			}
		}
	}), propertyConfig);

	objectClass.defineProperty("getOwnPropertyDescriptor", objectFactory.createFunction(function (obj, prop) {
		verifyObject(obj, "Object.getOwnPropertyDescriptor");

		prop = utils.toPrimitive(this, prop, "string");

		if (obj.hasOwnProperty(prop)) {
			var descriptor = obj.getPropertyDescriptor(prop);

			var result = objectFactory.createObject();
			result.setProperty("configurable", objectFactory.createPrimitive(descriptor.configurable));
			result.setProperty("enumerable", objectFactory.createPrimitive(descriptor.enumerable));

			if (descriptor.get || descriptor.set) {
				result.setProperty("get", descriptor.get || undef);
				result.setProperty("set", descriptor.set || undef);
			} else {
				result.setProperty("value", descriptor.value);
				result.setProperty("writable", objectFactory.createPrimitive(descriptor.writable));
			}

			return result;
		}

		return undef;
	}), propertyConfig);

	objectClass.defineProperty("keys", objectFactory.createFunction(function (obj) {
		var arr = objectFactory.create("Array");
		var index = 0;

		Object.keys(obj.properties).forEach(function (name) {
			if (obj.properties[name].enumerable) {
				arr.setProperty(index++, objectFactory.createPrimitive(name));
			}
		});

		return arr;
	}), propertyConfig);

	objectClass.defineProperty("getOwnPropertyNames", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.getOwnPropertyNames");

		var arr = objectFactory.create("Array");
		var i = 0;

		for (var prop in obj.properties) {
			// ignore prototype
			if (prop !== "prototype") {
				arr.setProperty(i++, objectFactory.createPrimitive(prop));
			}
		}

		return arr;
	}), propertyConfig);

	objectClass.defineProperty("getPrototypeOf", objectFactory.createFunction(function (obj) {
		return obj.proto;
	}), propertyConfig);

	objectClass.defineProperty("freeze", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.freeze");
		obj.freeze();
		return obj;
	}), propertyConfig);

	objectClass.defineProperty("isFrozen", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.isFrozen");
		return objectFactory.createPrimitive(obj.isPrimitive || obj.frozen);
	}), propertyConfig);

	objectClass.defineProperty("preventExtensions", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.preventExtensions");
		obj.preventExtensions();
		return obj;
	}), propertyConfig);

	objectClass.defineProperty("isExtensible", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.isExtensible");
		return objectFactory.createPrimitive(obj.extensible !== false);
	}), propertyConfig);

	objectClass.defineProperty("seal", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.seal");
		obj.seal();
		return obj;
	}), propertyConfig);

	objectClass.defineProperty("isSealed", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.isSealed");
		return objectFactory.createPrimitive(obj.sealed);
	}), propertyConfig);

	globalScope.getProperty("Function").parent = objectClass;
	globalScope.defineProperty("Object", objectClass, propertyConfig);
};
