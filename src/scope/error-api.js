var errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "EvalError"];

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var errorClass = objectFactory.createFunction(function (message) {
		var obj = objectFactory.create("Error");
		obj.putValue("message", message);
		obj.putValue("name", objectFactory.createPrimitive("Error"));
		return obj;
	});

	errorClass.proto.defineOwnProperty("toString", objectFactory.createFunction(function () {
		var name = this.node.getValue("name");
		var msg = this.node.getValue("message");

		name = name && name.toString();
		msg = msg && msg.toString();

		if (name && msg) {
			return objectFactory.create("String", name + ": " + msg);
		}

		return objectFactory.create("String", name || msg);
	}), { enumerable: false });

	globalScope.defineOwnProperty("Error", errorClass, { enumerable: false });

	errorTypes.forEach(function (type) {
		var errClass = objectFactory.createFunction(function (message) {
			var err = objectFactory.create("Error", { name: type });
			err.putValue("message", message);
			err.putValue("name", objectFactory.createPrimitive(type));
			return err;
		});

		globalScope.defineOwnProperty(type, errClass, { enumerable: false });
	});
};
