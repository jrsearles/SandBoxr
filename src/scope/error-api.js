var convert = require("../utils/convert");
var types = require("../utils/types");

var errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "EvalError"];

function createError (objectFactory, message, name) {
	var options = null;
	if (name) {
		options = { name: name };
	}
	
	var obj = objectFactory.create("Error", options);

	if (!types.isNullOrUndefined(message)) {
		obj.defineOwnProperty("message", { value: message, configurable: true, enumerable: false, writable: true }, false);
	}

	return obj;
}

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var errorClass = objectFactory.createFunction(function (message) {
		return createError(objectFactory, message);
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	var proto = errorClass.getProperty("prototype").getValue();
	proto.className = "Error";
	proto.define("name", objectFactory.createPrimitive("Error"));
	proto.define("message", objectFactory.createPrimitive(""));

	proto.define("toString", objectFactory.createFunction(function () {
		var name = this.node.getProperty("name").getValue();
		var msg;

		if (this.node.hasProperty("message")) {
			msg = convert.toString(env, this.node.getProperty("message").getValue());
		}

		name = name && name.toString();
		if (name && msg) {
			return objectFactory.create("String", name + ": " + msg);
		}

		return objectFactory.create("String", name || msg);
	}));

	globalObject.define("Error", errorClass);

	errorTypes.forEach(function (type) {
		var errClass = objectFactory.createFunction(function (message) {
			return createError(objectFactory, message, type);
		}, null, null, null, { configurable: false, enumerable: false, writable: false });

		var typeProto = errClass.getProperty("prototype").getValue();
		typeProto.define("name", objectFactory.createPrimitive(type));
		globalObject.define(type, errClass);
	});
};
