var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

module.exports = function (globalScope) {
	var booleanClass = objectFactory.createFunction(utils.wrapNative(Boolean));
	typeRegistry.set("Boolean", booleanClass);
	globalScope.setProperty("Boolean", booleanClass);
};
