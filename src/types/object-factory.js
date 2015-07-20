var PrimitiveType = require("./primitive-type");
var FunctionType = require("./function-type");
var NativeFunctionType = require("./native-function-type");
var RegexType = require("./regex-type");
var ObjectType = require("./object-type");
var ArrayType = require("./array-type");
var StringType = require("./string-type");
var DateType = require("./date-type");
var ErrorType = require("./error-type");
var ArgumentType = require("./argument-type");
var types = require("../utils/types");

var parentless = {
	"Undefined": true,
	"Null": true,
	"Function": true
};

var orphans = Object.create(null);

function setOrphans (scope) {
	var parent;

	for (var typeName in orphans) {
		parent = scope.getValue(typeName);
		if (parent) {
			orphans[typeName].forEach(function (child) {
				child.setPrototype(parent.getProperty("prototype").getValue());
				// child.setProto(parent.proto);
			});

			delete orphans[typeName];
		}
	}

	orphans = Object.create(null);
}

function setProto (typeName, instance, env) {
	if (typeName in parentless) {
		return;
	}

	var parent = env.getReference(typeName);
	if (!parent.isUnresolved()) {
		instance.setPrototype(parent.getValue().getProperty("prototype").getValue());
		// instance.parent = parent.getValue();
		// instance.setProto(instance.parent.proto);
		return;
	}

	// during initialization it is possible for objects to be created
	// before the types have been registered - add a registry of items
	// and these can be filled in when the type is registered
	orphans[typeName] = orphans[typeName] || [];
	orphans[typeName].push(instance);
}

function ObjectFactory (env) {
	this.env = env;
}

ObjectFactory.prototype = {
	constructor: ObjectFactory,

	init: function () {
		setOrphans(this.env);
	},

	createPrimitive: function (value) {
		return this.create(types.getType(value), value);
	},

	create: function (typeName, value) {
		var instance;

		switch (typeName) {
			case "String":
				instance = new StringType(value);
				break;

			case "Number":
			case "Boolean":
			case "Null":
			case "Undefined":
				instance = new PrimitiveType(value);
				break;

			case "Date":
				instance = new DateType(value);
				break;

			case "RegExp":
				instance = new RegexType(value);
				break;

			case "Array":
				instance = new ArrayType();
				break;

			case "Error":
				instance = new ErrorType(value);

				if (value) {
					typeName = value.name || typeName;
					instance.defineOwnProperty("message", {
						value: this.createPrimitive(value.message),
						configurable: true,
						enumerable: false,
						writable: true
					});
				}

				// instance.putValue("name", this.createPrimitive(typeName));
				break;

			default:
				throw new Error("Not a primitive: " + value);
		}

		instance.init(this);
		setProto(typeName, instance, this.env);
		return instance;
	},

	createObject: function (parent) {
		var instance = new ObjectType();
		if (parent !== null) {
			if (parent) {
				instance.setPrototype(parent && parent.getProperty("prototype").getValue());
				// instance.parent = parent;
				// instance.setProto(parent.proto);
			} else {
				// instance.parent = this.env.global.getProperty("Object").getValue();
				setProto("Object", instance, this.env);
			}
		}

		instance.init(this);
		return instance;
	},

	createArguments: function (args, callee) {
		var instance = new ArgumentType();
		var objectClass = this.env.global.getProperty("Object").getValue();

		instance.init(this, objectClass, objectClass.proto);
		// instance.parent = objectClass;
		instance.setPrototype(objectClass.getProperty("prototype").getValue());
		
		// for (var i = 0, ln = args.length; i < ln; i++) {
		// 	instance.defineOwnProperty(i, args[i], { configurable: true, enumerable: true, writable: true }, false);
		// }

		// instance.defineOwnProperty("length", this.createPrimitive(ln), { configurable: true, enumerable: false, writable: true }, false);
		instance.defineOwnProperty("callee", { value: callee, configurable: true, enumerable: false, writable: true });
		return instance;
	},

	createFunction: function (fnOrNode, parentScope, proto, ctor, descriptor) {
		// todo: need to verify that prototype arg is needed
		var instance;

		if (typeof fnOrNode === "function") {
			instance = new NativeFunctionType(fnOrNode, parentScope);
		} else {
			instance = new FunctionType(fnOrNode, parentScope);
		}

		instance.init(this, proto, ctor, descriptor);
		var functionClass = this.env.getReference("Function");
		if (functionClass && !functionClass.isUnresolved()) {
			// instance.parent = functionClass.getValue();
			instance.setPrototype(functionClass.getValue().getProperty("prototype").getValue());
		}

		return instance;
	},

	createBuiltInFunction: function (fn, length, methodName) {
		var instance = new NativeFunctionType(function () {
			if (this.isNew) {
				throw new TypeError(methodName + " is not a constructor");
			}

			return fn.apply(this, arguments);
		});

		instance.setPrototype(this.env.getValue("Function").getProperty("prototype").getValue());
		instance.builtIn = true;
		instance.defineOwnProperty("length", { value: this.createPrimitive(length), configurable: false, enumerable: false, writable: false });
		return instance;
	}
};

module.exports = ObjectFactory;
