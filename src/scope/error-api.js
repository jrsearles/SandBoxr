var objectFactory = require("../types/object-factory");

var errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "EvalError"];

module.exports = function (globalScope) {
	var errorClass = objectFactory.createFunction(function (message) {
		var obj = objectFactory.create("Error");
		obj.setProperty("message", message);
		obj.setProperty("name", objectFactory.createPrimitive("Error"));
		return obj;
	});

	errorClass.proto.defineProperty("toString", objectFactory.createFunction(function () {
		var name = this.node.getProperty("name");
		var msg = this.node.getProperty("message");

		name = name && name.toString();
		msg = msg && msg.toString();

		if (name && msg) {
			return objectFactory.create("String", name + ": " + msg);
		}

		return objectFactory.create("String", name || msg);
	}), { enumerable: false });

	globalScope.defineProperty("Error", errorClass, { enumerable: false });

	errorTypes.forEach(function (type) {
		var errClass = objectFactory.createFunction(function (message) {
			var err = objectFactory.createObject("Error", { name: type });
			err.setProperty("message", message);
			err.setProperty("name", objectFactory.createPrimitive(type));
			return err;
		});

		globalScope.defineProperty(type, errClass, { enumerable: false });
	});
};
