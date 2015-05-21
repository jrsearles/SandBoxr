var objectFactory = require("../types/object-factory");

var errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError"];

module.exports = function (globalScope) {
	var errorClass = objectFactory.createFunction(function (message) {
		var obj = objectFactory.createObject();
		obj.setProperty("message", message);
		return obj;
	});

	globalScope.setProperty("Error", errorClass);

	errorTypes.forEach(function (type) {
		var errClass = objectFactory.createFunction(function (message) {
			var err = objectFactory.createObject(errorClass);
			err.setProperty("message", message);
			return err;
		});

		globalScope.setProperty(type, errClass);
	});
};
