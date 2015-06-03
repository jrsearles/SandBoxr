var objectFactory = require("../types/object-factory");
var utils = require("../utils");

module.exports = function (globalScope) {
	var undef = globalScope.getProperty("undefined");

	var objectClass = objectFactory.createFunction(function (value) {
		if (value) {
			if (value.isPrimitive) {
				var obj = objectFactory.createObject();
				return utils.createWrappedPrimitive(obj, value.value);
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
	}), { enumerable: false });

	proto.defineProperty("valueOf", objectFactory.createFunction(function () {
		if ("value" in this.node) {
			return objectFactory.createPrimitive(this.node.value);
		}

		return this.node;
	}));

	proto.defineProperty("toString", objectFactory.createFunction(function () {
		var obj = this.scope.thisNode;
		var value = obj.objectType;
		if (obj.isPrimitive || obj.value !== undefined) {
			value = String(obj.value);
		}

		return objectFactory.createPrimitive(value);
	}));

	proto.defineProperty("isPrototypeOf", objectFactory.createFunction(function (obj) {
		var current = obj;
		while (current) {
			if (current === this.scope.thisNode) {
				return objectFactory.createPrimitive(true);
			}

			current = current.proto;
		}

		return objectFactory.createPrimitive(false);
	}));

	objectClass.defineProperty("create", objectFactory.createFunction(function (parent, properties) {
		var obj = objectFactory.createObject();

		if (parent) {
			obj.setProto(parent.proto);
		}

		return obj;
	}));

	objectClass.defineProperty("defineProperty", objectFactory.createFunction(function (obj, prop, descriptor) {
		var value = undef;
		var options = { writable: false, enumerable: false, configurable: false };
		var executionContext = this;
		var getter, setter;

		if (descriptor) {
			["writable", "enumerable", "configurable"].forEach(function (name) {
				var propValue = descriptor.getProperty(name);
				if (propValue) {
					options[name] = propValue.value || options[name];
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
					var scope = executionContext.scope.createScope(this);

					utils.loadArguments(getter.node.params, [], scope);
					return executionContext.create(getter.node.body, getter.node, scope).execute().result;
				};
			}

			if (setter) {
				options.writable = true;
				options.set = setter;
				options.setter = function () {
					var scope = executionContext.scope.createScope(this);

					utils.loadArguments(setter.node.params, arguments, scope);
					var executionResult = executionContext.create(setter.node.body, setter.node, scope).execute();
					return executionResult ? executionResult.result : undef;
				};
			}

			if (value) {
				options.value = value;
			}
		}

		obj.setProperty(prop.toString(), value, options);
	}));

	objectClass.defineProperty("getOwnPropertyDescriptor", objectFactory.createFunction(function (obj, prop) {
		prop = prop.toString();
		if (prop in obj.properties) {
			var descriptor = obj.getPropertyDescriptor(prop);

			var result = objectFactory.createObject();
			result.setProperty("configurable", objectFactory.createPrimitive(descriptor.configurable));
			result.setProperty("enumerable", objectFactory.createPrimitive(descriptor.enumerable));

			if (descriptor.get || descriptor.set) {
				result.setProperty("value", undef);
				result.setProperty("writable", undef);
				result.setProperty("get", descriptor.get || undef);
				result.setProperty("set", descriptor.set || undef);
			} else {
				result.setProperty("value", descriptor.value);
				result.setProperty("writable", objectFactory.createPrimitive(descriptor.writable));
				result.setProperty("get", undef);
				result.setProperty("set", undef);
			}

			return result;
		}

		return undef;
	}));

	objectClass.defineProperty("keys", objectFactory.createFunction(function (obj) {
		var arr = objectFactory.create("Array");
		var index = 0;

		Object.keys(obj.properties).forEach(function (name) {
			if (obj.properties[name].enumerable) {
				arr.setProperty(index++, objectFactory.createPrimitive(name));
			}
		});

		return arr;
	}));

	objectClass.defineProperty("getPrototypeOf", objectFactory.createFunction(function (obj) {
		return obj.proto;
	}));

	objectClass.defineProperty("freeze", objectFactory.createFunction(function (obj) {
		obj.freeze();
		return obj;
	}));

	objectClass.defineProperty("isFrozen", objectFactory.createFunction(function (obj) {
		return objectFactory.createPrimitive(obj.isPrimitive || obj.frozen);
	}));

	objectClass.defineProperty("preventExtensions", objectFactory.createFunction(function (obj) {
		obj.preventExtensions();
		return obj;
	}));

	objectClass.defineProperty("isExtensible", objectFactory.createFunction(function (obj) {
		return objectFactory.createPrimitive(obj.extensible !== false);
	}));

	objectClass.defineProperty("seal", objectFactory.createFunction(function (obj) {
		obj.seal();
		return obj;
	}));

	objectClass.defineProperty("isSealed", objectFactory.createFunction(function (obj) {
		return objectFactory.createPrimitive(obj.sealed);
	}));

	globalScope.defineProperty("Object", objectClass, { enumerable: false });
};
