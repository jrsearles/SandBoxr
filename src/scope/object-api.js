var objectFactory = require("../types/object-factory");
var ObjectType = require("../types/object-type");
var utils = require("../utils");

var propertyConfig = { enumerable: false };

function verifyObject (obj, source) {
	if (!obj || obj.isPrimitive) {
		throw new TypeError(source + " called on non-object");
	}
}

function defineProperty (context, obj, name, descriptor) {
	var value = objectFactory.scope.getValue("undefined");
	var options = { writable: false, enumerable: false, configurable: false };
	var getter, setter;

	if (descriptor) {
		["writable", "enumerable", "configurable"].forEach(function (prop) {
			var propValue = descriptor.getValue(prop);
			if (propValue) {
				options[prop] = propValue.value || options[prop];
			}
		});

		value = descriptor.getValue("value");
		getter = descriptor.getValue("get");
		setter = descriptor.getValue("set");

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

	obj.putValue(name, value, options);
}

module.exports = function (globalScope) {
	var undef = globalScope.getValue("undefined");

	var proto = new ObjectType();
	var objectClass = objectFactory.createFunction(function (value) {
		if (value) {
			if (value.isPrimitive) {
				var objectWrapper = objectFactory.createPrimitive(value.value);
				objectWrapper.type = "object";
				objectWrapper.isPrimitive = false;
				return objectWrapper;
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
	}, globalScope, proto);

	// var proto = objectClass.proto;
	proto.defineOwnProperty("hasOwnProperty", objectFactory.createFunction(function (name) {
		name = name.toString();
		return objectFactory.createPrimitive(name in this.node.properties);
	}), propertyConfig);

	proto.defineOwnProperty("valueOf", objectFactory.createFunction(function () {
		if ("value" in this.node) {
			return objectFactory.createPrimitive(this.node.value);
		}

		return this.node;
	}), propertyConfig);

	proto.defineOwnProperty("toString", objectFactory.createFunction(function () {
		var obj = this.scope.thisNode;
		return objectFactory.createPrimitive("[object " + obj.className + "]");
	}), propertyConfig);

	proto.defineOwnProperty("toLocaleString", objectFactory.createFunction(function () {
		return objectFactory.createPrimitive(this.node.toString());
	}), propertyConfig);

	proto.defineOwnProperty("isPrototypeOf", objectFactory.createFunction(function (obj) {
		var current = obj;
		while (current) {
			if (current === this.scope.thisNode) {
				return objectFactory.createPrimitive(true);
			}

			current = current.proto; // && current.parent.proto;
		}

		return objectFactory.createPrimitive(false);
	}), propertyConfig);

	proto.defineOwnProperty("propertyIsEnumerable", objectFactory.createFunction(function (name) {
		var descriptor = this.node.getProperty(name.toString());
		return objectFactory.createPrimitive(!!(descriptor && descriptor.enumerable));
	}), propertyConfig);

	objectClass.defineOwnProperty("create", objectFactory.createFunction(function (parent, properties) {
		var obj = objectFactory.createObject();

		if (parent) {
			obj.setProto(parent.proto);
		}

		return obj;
	}), propertyConfig);

	objectClass.defineOwnProperty("defineProperty", objectFactory.createFunction(function (obj, prop, descriptor) {
		defineProperty(this, obj, prop.toString(), descriptor);
	}), propertyConfig);

	objectClass.defineOwnProperty("defineProperties", objectFactory.createFunction(function (obj, descriptors) {
		for (var prop in descriptors.properties) {
			if (descriptors.properties[prop].enumerable) {
				defineProperty(this, obj, prop, descriptors.getValue(prop));
			}
		}
	}), propertyConfig);

	objectClass.defineOwnProperty("getOwnPropertyDescriptor", objectFactory.createFunction(function (obj, prop) {
		verifyObject(obj, "Object.getOwnPropertyDescriptor");

		prop = utils.toPrimitive(this, prop, "string");

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
	}), propertyConfig);

	objectClass.defineOwnProperty("keys", objectFactory.createFunction(function (obj) {
		var arr = objectFactory.create("Array");
		var index = 0;

		Object.keys(obj.properties).forEach(function (name) {
			if (obj.properties[name].enumerable) {
				arr.putValue(index++, objectFactory.createPrimitive(name));
			}
		});

		return arr;
	}), propertyConfig);

	objectClass.defineOwnProperty("getOwnPropertyNames", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.getOwnPropertyNames");

		var arr = objectFactory.create("Array");
		var i = 0;

		for (var prop in obj.properties) {
			// ignore prototype
			if (prop !== "prototype") {
				arr.putValue(i++, objectFactory.createPrimitive(prop));
			}
		}

		return arr;
	}), propertyConfig);

	objectClass.defineOwnProperty("getPrototypeOf", objectFactory.createFunction(function (obj) {
		return obj.parent && obj.parent.proto;
	}), propertyConfig);

	objectClass.defineOwnProperty("freeze", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.freeze");
		obj.freeze();
		return obj;
	}), propertyConfig);

	objectClass.defineOwnProperty("isFrozen", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.isFrozen");
		return objectFactory.createPrimitive(obj.isPrimitive || obj.frozen);
	}), propertyConfig);

	objectClass.defineOwnProperty("preventExtensions", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.preventExtensions");
		obj.preventExtensions();
		return obj;
	}), propertyConfig);

	objectClass.defineOwnProperty("isExtensible", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.isExtensible");
		return objectFactory.createPrimitive(obj.extensible !== false);
	}), propertyConfig);

	objectClass.defineOwnProperty("seal", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.seal");
		obj.seal();
		return obj;
	}), propertyConfig);

	objectClass.defineOwnProperty("isSealed", objectFactory.createFunction(function (obj) {
		verifyObject(obj, "Object.isSealed");
		return objectFactory.createPrimitive(obj.sealed);
	}), propertyConfig);

	globalScope.getValue("Function").parent = objectClass;
	globalScope.defineOwnProperty("Object", objectClass, propertyConfig);
};
