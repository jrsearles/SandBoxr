var convert = require("../utils/convert");

var methods = ["log", "info", "error"];

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var consoleClass = objectFactory.createObject();

	methods.forEach(function (name) {
		consoleClass.defineOwnProperty(name, convert.toNativeFunction(objectFactory, function (message) {
			var stringValue = convert.toString(this, message);
			console[name](stringValue);
		}, "console." + name));
	});

	globalScope.defineOwnProperty("console", consoleClass);
};
