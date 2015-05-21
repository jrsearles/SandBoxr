var objectFactory = require("../types/object-factory");
var utils = require("../utils");

module.exports = function (globalScope) {
	var dateClass = objectFactory.createFunction(utils.wrapNative(Date));
	globalScope.setProperty("Date", dateClass);
};
