var PrimitiveType = require("./primitive-type");
var FunctionType = require("./function-type");
var NativeFunctionType = require("./native-function-type");
var RegexType = require("./regex-type");
var ObjectType = require("./object-type");
var ArrayType = require("./array-type");
var StringType = require("./string-type");
var typeRegistry = require("./type-registry");

var objectRgx = /\[object (\w+)\]/;

var parentless = {
	"UNDEFINED": true,
	"NULL": true,
	"FUNCTION": true
};

module.exports = {
	createPrimitive: function (value) {
		var typeName = objectRgx.exec(Object.prototype.toString.call(value))[1];
		return this.create(typeName, value);
	},

	create: function (typeName, value) {
		typeName = typeName.toUpperCase();
		var instance;

		switch (typeName) {
			case "STRING":
				instance = new StringType(value);
				break;

			case "NUMBER":
			case "BOOLEAN":
			case "DATE":
			case "NULL":
			case "UNDEFINED":
				instance = new PrimitiveType(value);
				break;

			case "REGEXP":
				instance = new RegexType(value);
				break;

			case "ARRAY":
				instance = new ArrayType();
				break;

			default:
				throw new Error("Not a primitive: " + value);
		}

		// during initialization it is possible for objects to be created
		// before the types have been registered - add a registry of items
		// and these can be filled in when the type is registered
		if (!(typeName in parentless)) {
			typeRegistry.setParent(instance, typeName);
		}

		instance.init(this);
		return instance;
	},

	createObject: function (parent) {
		var instance = new ObjectType(parent);
		if (arguments.length === 0) {
			typeRegistry.setParent(instance, "OBJECT");
		}

		instance.init(this);
		return instance;
	},

	createFunction: function (fnOrNode) {
		var instance;

		if (typeof fnOrNode === "function") {
			instance = new NativeFunctionType(fnOrNode);
		} else {
			instance = new FunctionType(fnOrNode);
		}

		instance.init(this);
		return instance;
	}
};
