var convert = require("../utils/convert");

var constants = ["E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"];
var methods = ["abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", "floor", "log", "max", "min", "pow", "random", "round", "sin", "sqrt", "tan"];

module.exports = function (env) {
	var globalObject = env.global;
	var objectFactory = env.objectFactory;
	var mathClass = objectFactory.createObject();
	mathClass.className = "Math";

	constants.forEach(function (name) {
		mathClass.define(name, objectFactory.createPrimitive(Math[name]), { configurable: false, enumerable: false, writable: false });
	});

	methods.forEach(function (name) {
		mathClass.define(name, convert.toNativeFunction(objectFactory, Math[name], "Math." + name));
	});

	globalObject.define("Math", mathClass);
};
