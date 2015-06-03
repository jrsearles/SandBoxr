var PrimitiveType = require("./primitive-type");
var FunctionType = require("./function-type");
var NativeFunctionType = require("./native-function-type");
var RegexType = require("./regex-type");
var ObjectType = require("./object-type");
var ArrayType = require("./array-type");
var StringType = require("./string-type");
var ErrorType = require("./error-type");
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
		parent = scope.getProperty(typeName);
		if (parent) {
			orphans[typeName].forEach(function (child) {
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

	var parent = scope.getProperty(typeName);
	if (parent) {
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
			case "Date":
			case "Null":
			case "Undefined":
				instance = new PrimitiveType(value);
				break;

			case "RegExp":
				instance = new RegexType(value);
				break;

			case "Array":
				instance = new ArrayType();
				break;

			case "Error":
				typeName = value.name || typeName;
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
			if (parent === this.scope.getProperty("Date")) {
				return this.create("Date");
			}

			if (parent === this.scope.getProperty("Array")) {
				return this.create("Array");
			}
		}

		if (parent !== null) {
			parent = parent || this.scope.getProperty("Object");
		}

		var instance = new ObjectType();
		if (parent && parent.proto) {
			instance.setProto(parent.proto);
		}

		instance.init(this);
		return instance;
	},

	createFunction: function (fnOrNode, parentScope) {
		var instance;

		if (typeof fnOrNode === "function") {
			instance = new NativeFunctionType(fnOrNode, parentScope);
		} else {
			instance = new FunctionType(fnOrNode, parentScope);
		}

		instance.init(this);

		var functionClass = this.scope.getProperty("Function");
		if (functionClass) {
			instance.parent = functionClass;
			// for (var prop in functionClass.properties) {
			// 	instance.properties[prop] = functionClass.properties[prop];
			// 	// instance.setProperty(prop, functionClass.properties[prop], value, { configurable: false, enumerable: false, writable: true });
			// }
		} else {
			delete instance.properties.prototype;
			delete instance.proto;
		}

		return instance;
	}
};
