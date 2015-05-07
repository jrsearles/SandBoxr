var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

module.exports = function (globalScope) {
	var functionClass = objectFactory.createFunction(utils.wrapNative(Function));
	typeRegistry.set("FUNCTION", functionClass);

	// since function doesn't have a parent, need to setup explicit toString/valueOf
	functionClass.proto.setProperty("toString", objectFactory.createFunction(utils.wrapNative(Function.prototype.toString)));
	functionClass.proto.setProperty("valueOf", objectFactory.createFunction(utils.wrapNative(Function.prototype.valueOf)));

	globalScope.setProperty("Function", functionClass);
};
