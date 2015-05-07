var objectFactory = require("../types/object-factory");
var utils = require("../utils");

var constants = ["E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"];
var methods = ["abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", "floor", "log", "max", "min", "pow", "random", "round", "sin", "sqrt", "tan"];

module.exports = function (globalScope) {
	var mathClass = objectFactory.createObject();

	constants.forEach(function (name) {
		mathClass.setProperty(name, Math[name], { configurable: false, enumerable: false, writable: false });
	});

	methods.forEach(function (name) {
		mathClass.setProperty(name, utils.wrapNative(Math[name]));
	});

	globalScope.setProperty("Math", mathClass);
};
