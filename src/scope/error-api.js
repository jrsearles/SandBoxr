var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");

module.exports = function (globalScope) {
	var errorClass = objectFactory.createFunction(function (message) {
		var obj = objectFactory.createObject(errorClass);
		obj.setProperty("message", message);
		return obj;
	});

	typeRegistry.set("Error", errorClass);
	globalScope.setProperty("Error", errorClass);
};
