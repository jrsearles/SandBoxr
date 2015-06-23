var convert = require("../utils/convert");

var methods = ["log", "info", "error"];

module.exports = function (globalScope) {
	var objectFactory = globalScope.factory;
	var consoleClass = objectFactory.createObject();

	methods.forEach(function (name) {
		consoleClass.defineOwnProperty(name, objectFactory.createFunction(convert.toNativeFunction(console[name])));
	});

	globalScope.defineOwnProperty("console", consoleClass);
};
