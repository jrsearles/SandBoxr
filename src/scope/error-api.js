var errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "EvalError"];

var propertyConfig = { configurable: true, enumerable: false, writable: true };

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var errorClass = objectFactory.createFunction(function (message) {
		var obj = objectFactory.create("Error");
		obj.putValue("message", message, false, this);
		obj.putValue("name", objectFactory.createPrimitive("Error"), false, this);
		return obj;
	}, null, null, null, { configurable: false, enumerable: false, writable: false });

	errorClass.proto.defineOwnProperty("toString", objectFactory.createFunction(function () {
		var name = this.node.getValue("name");
		var msg = this.node.getValue("message");

		name = name && name.toString();
		msg = msg && msg.toString();

		if (name && msg) {
			return objectFactory.create("String", name + ": " + msg);
		}

		return objectFactory.create("String", name || msg);
	}), propertyConfig);

	globalScope.defineOwnProperty("Error", errorClass, propertyConfig);

	errorTypes.forEach(function (type) {
		var errClass = objectFactory.createFunction(function (message) {
			var err = objectFactory.create("Error", { name: type });
			err.putValue("message", message, false, this);
			err.putValue("name", objectFactory.createPrimitive(type), false, this);
			return err;
		}, null, null, null, { configurable: false, enumerable: false, writable: false });

		errClass.proto.parent = errorClass;
		globalScope.defineOwnProperty(type, errClass, propertyConfig);
	});
};
