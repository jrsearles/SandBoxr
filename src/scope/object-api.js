var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

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

	proto.setProperty("valueOf", objectFactory.createFunction(function () {
		return this.node;
	}));

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
		var executionContext = this;
		var getter, setter;

		if (descriptor) {
			value = descriptor.getProperty("value");
			getter = descriptor.getProperty("get");
			setter = descriptor.getProperty("set");

			// we only keep a copy of the original getter/setter for use with `getOwnPropertyDescriptor`
			if (getter) {
				options.get = getter;
				options.getter = function () {
					var scope = executionContext.scope.createScope(obj);

					utils.loadArguments(getter.node.params, [], scope);
					return executionContext.create(getter.node.body, getter.node, scope).execute().result;
				};
			}

			if (setter) {
				options.writable = true;
				options.set = setter;
				options.setter = function () {
					var scope = executionContext.scope.createScope(obj);

					utils.loadArguments(setter.node.params, arguments, scope);
					var executionResult = executionContext.create(setter.node.body, setter.node, scope).execute();
					return executionResult ? executionResult.result : typeRegistry.get("undefined");
				};
			}
		}

		obj.setProperty(prop.toString(), value, options);
	}));

	objectClass.setProperty("getOwnPropertyDescriptor", objectFactory.createFunction(function (obj, prop) {
		prop = prop.toString();
		if (prop in obj.properties) {
			var descriptor = obj.getPropertyDescriptor(prop);

			var result = objectFactory.createObject();
			result.setProperty("configurable", objectFactory.createPrimitive(descriptor.configurable));
			result.setProperty("enumerable", objectFactory.createPrimitive(descriptor.enumerable));
			result.setProperty("writable", objectFactory.createPrimitive(descriptor.writable));
			result.setProperty("value", descriptor.value);
			result.setProperty("get", descriptor.get);
			result.setProperty("set", descriptor.set);
			return result;
		}

		return typeRegistry.get("undefined");
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
