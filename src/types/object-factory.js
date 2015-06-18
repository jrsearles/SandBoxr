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
var util = require("../util");

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
				child.parent = parent;
				child.setProto(parent.proto);
			});

			delete orphans[typeName];
		}
	}

	orphans = Object.create(null);
}

function setProto (typeName, instance, scope) {
	if (typeName in parentless) {
		return;
	}

	var parent = scope.getValue(typeName);
	if (parent) {
		instance.parent = parent;
		instance.setProto(parent.proto);
		return;
	}

	// during initialization it is possible for objects to be created
	// before the types have been registered - add a registry of items
	// and these can be filled in when the type is registered
	orphans[typeName] = orphans[typeName] || [];
	orphans[typeName].push(instance);
}

module.exports = {
	startScope: function (scope) {
		this.scope = scope;
	},

	endScope: function () {
		setOrphans(this.scope);
	},

	createPrimitive: function (value) {
		return this.create(util.getType(value), value);
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
				typeName = value && value.name || typeName;
				instance = new ErrorType(value);
				break;

			default:
				throw new Error("Not a primitive: " + value);
		}

		instance.init(this);
		setProto(typeName, instance, this.scope);
		return instance;
	},

	createObject: function (parent) {
		if (parent) {
			// special cases
			if (parent === this.scope.getValue("Date")) {
				return this.create("Date", new Date());
			}

			if (parent === this.scope.getValue("Array")) {
				return this.create("Array");
			}
		}

		// if (parent !== null) {
		// 	parent = parent || this.scope.getValue("Object");
		// }

		var instance = new ObjectType();
		if (parent !== null) {
			if (parent) {
				instance.parent = parent;
				instance.setProto(parent && parent.proto);
			} else {
				setProto("Object", instance, this.scope);
			}
		}

		instance.init(this);
		return instance;
	},

	createArguments: function (args, callee) {
		var instance = new ArgumentType();
		var ctor = this.scope.getValue("Object");
		var i, ln;

		// instance.setProto(proto);
		instance.init(this, ctor, ctor.proto);

		for (i = 0, ln = args.length; i < ln; i++) {
			instance.defineOwnProperty(i, args[i], { configurable: true });
		}

		instance.defineOwnProperty("length", this.createPrimitive(ln), { configurable: false, enumerable: false });
		instance.defineOwnProperty("callee", callee, { enumerable: false });
		return instance;
	},

	createFunction: function (fnOrNode, parentScope, proto, ctor) {
		// todo: need to verify that prototype arg is needed
		var instance;

		if (typeof fnOrNode === "function") {
			instance = new NativeFunctionType(fnOrNode, parentScope);
		} else {
			instance = new FunctionType(fnOrNode, parentScope);
		}

		instance.init(this, proto, ctor);
		var functionClass = this.scope.getValue("Function");
		if (functionClass) {
			instance.parent = functionClass;
			// for (var prop in functionClass.proto) {
			// 	instance.properties[prop] = functionClass.properties[prop];
			// }
			// instance.setProto(functionClass);
			// instance.parent = functionClass;
		} else {
			// delete instance.properties.prototype;
			// delete instance.proto;
		}

		return instance;
	}
};
