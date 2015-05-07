var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

module.exports = function (globalScope) {
	var objectClass = objectFactory.createFunction(utils.wrapNative(Object), null);
	typeRegistry.set("OBJECT", objectClass);

	objectClass.proto.setProperty("hasOwnProperty", objectFactory.createFunction(function (name) {
		name = name.toString();
		return objectFactory.createPrimitive(name in this.node.properties);
	}), { enumerable: false });

	objectClass.setProperty("keys", objectFactory.createFunction(function (obj) {
		var arr = objectFactory.create("ARRAY");
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

	globalScope.setProperty("Object", objectClass);
};
