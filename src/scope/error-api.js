var convert = require("../utils/convert");
var types = require("../utils/types");

var errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "EvalError"];

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var errorClass = objectFactory.createFunction(function (message) {
		var obj = objectFactory.create("Error");

		if (!types.isNullOrUndefined(message)) {
			obj.putValue("message", message, false);
		}

		return obj;
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
			var err = objectFactory.create("Error", { name: type });
			err.putValue("message", message, false, this);
			err.putValue("name", objectFactory.createPrimitive(type), false, this);
			return err;
		}, null, null, null, { configurable: false, enumerable: false, writable: false });

		// errClass.setPrototype(proto);
		globalObject.define(type, errClass);
	});
};
