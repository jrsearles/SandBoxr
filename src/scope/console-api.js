var convert = require("../utils/convert");

var methods = ["log", "info", "error"];

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var consoleClass = objectFactory.createObject();

	methods.forEach(function (name) {
		consoleClass.defineOwnProperty(name, objectFactory.createBuiltInFunction(function (message) {
			var stringValue = convert.toString(this, message);
			console[name](stringValue);
		}, 1, "console." + name));
	});

	globalObject.defineOwnProperty("console", consoleClass);
};
