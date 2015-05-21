var objectFactory = require("../types/object-factory");
var utils = require("../utils");

module.exports = function (globalScope) {
	var booleanClass = objectFactory.createFunction(utils.wrapNative(Boolean));
	globalScope.setProperty("Boolean", booleanClass);
};
