var objectFactory = require("../types/object-factory");

var errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "EvalError"];

module.exports = function (globalScope) {
	var errorClass = objectFactory.createFunction(function (message) {
		var obj = objectFactory.createObject();
		obj.setProperty("message", message);
		return obj;
	});

	globalScope.defineProperty("Error", errorClass, { enumerable: false });

	errorTypes.forEach(function (type) {
		var errClass = objectFactory.createFunction(function (message) {
			var err = objectFactory.createObject(errorClass);
			err.setProperty("message", message);
			err.setProperty("type", objectFactory.createPrimitive(type));
			return err;
		});

		globalScope.defineProperty(type, errClass, { enumerable: false });
	});
};
