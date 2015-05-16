var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");

var errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError"];

module.exports = function (globalScope) {
	var errorClass = objectFactory.createFunction(function (message) {
		var obj = objectFactory.createObject();
		obj.setProperty("message", message);
		return obj;
	});

	typeRegistry.set("Error", errorClass);
	globalScope.setProperty("Error", errorClass);

	errorTypes.forEach(function (type) {
		var errClass = objectFactory.createFunction(function (message) {
			var err = objectFactory.createObject(errorClass);
			err.setProperty("message", message);
			return err;
		});

		typeRegistry.set(type, errClass);
		globalScope.setProperty(type, errClass);
	});
};
