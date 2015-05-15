var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");

module.exports = function (globalScope) {
	var objectClass = objectFactory.createFunction(function () {
		return objectFactory.createObject();
	});

	var proto = objectClass.getProperty("prototype");
	proto.setProperty("hasOwnProperty", objectFactory.createFunction(function (name) {
		name = name.toString();
		// var hasOwn = name in this.node.properties || (this.node.parent && this.node.parent.proto && name in this.node.parent.proto.properties);
		return objectFactory.createPrimitive(name in this.node.properties);
	}), { enumerable: false });

	objectClass.setProperty("create", objectFactory.createFunction(function (parent, properties) {
		var obj = objectFactory.createObject();

		if (parent) {
			obj.setProperty("prototype", parent);
		}

		return obj;
	}));

	objectClass.setProperty("defineProperty", objectFactory.createFunction(function (obj, prop, descriptor) {
		var value = typeRegistry.get("undefined");
		var options = { writable: false, enumerable: false, configurable: false };
		if (descriptor) {
			value = descriptor.getProperty("value") || value;
		}

		obj.setProperty(prop.toString(), value, options);
	}));

	objectClass.setProperty("keys", objectFactory.createFunction(function (obj) {
		var arr = objectFactory.create("Array");
		Object.keys(obj.enumerable).forEach(function (name, index) {
			arr.setProperty(index, objectFactory.createPrimitive(name));
		});

		return arr;
	}));

	objectClass.setProperty("freeze", objectFactory.createFunction(function (obj) {
		obj.freeze();
		return obj;
	}));

	objectClass.setProperty("isFrozen", objectFactory.createFunction(function (obj) {
		return objectFactory.createPrimitive(obj.isPrimitive || !!obj.frozen);
	}));

	objectClass.setProperty("preventExtensions", objectFactory.createFunction(function (obj) {
		obj.preventExtensions();
		return obj;
	}));

	objectClass.setProperty("isExtensible", objectFactory.createFunction(function (obj) {
		return objectFactory.createPrimitive(obj.extensible !== false);
	}));

	typeRegistry.set("Object", objectClass);
	globalScope.setProperty("Object", objectClass);
};
