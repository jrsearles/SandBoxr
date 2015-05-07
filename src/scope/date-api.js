var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

module.exports = function (globalScope) {
	var dateClass = objectFactory.createFunction(utils.wrapNative(Date));
	typeRegistry.set("DATE", dateClass);
	globalScope.setProperty("Date", dateClass);
};
