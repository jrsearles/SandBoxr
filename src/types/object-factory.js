var PrimitiveType = require("./primitive-type");
var FunctionType = require("./function-type");
var NativeFunctionType = require("./native-function-type");
var RegexType = require("./regex-type");
var ObjectType = require("./object-type");
var ArrayType = require("./array-type");
var StringType = require("./string-type");
var ErrorType = require("./error-type");
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

			case "ERROR":
				typeName = (value.name || typeName).toUpperCase();
				instance = new ErrorType(value);
				break;

			default:
				throw new Error("Not a primitive: " + value);
		}

		instance.init(this);

		// during initialization it is possible for objects to be created
		// before the types have been registered - add a registry of items
		// and these can be filled in when the type is registered
		if (!(typeName in parentless)) {
			typeRegistry.setParent(instance, typeName);
		}

		return instance;
	},

	createObject: function (parent) {
		if (parent !== null) {
			parent = parent || typeRegistry.get("Object");
			// instance.setProto(parent);
		}

		var instance = new ObjectType(parent);
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
		typeRegistry.setParent(instance, "Function");
		return instance;
	}
};
