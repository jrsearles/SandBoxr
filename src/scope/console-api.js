var objectFactory = require("../types/object-factory");
var utils = require("../utils");

var methods = ["log", "info", "error"];

module.exports = function (globalScope) {
	var consoleClass = objectFactory.createObject();

	methods.forEach(function (name) {
		consoleClass.defineOwnProperty(name, objectFactory.createFunction(utils.wrapNative(console[name])));
	});

	globalScope.defineOwnProperty("console", consoleClass);
};
