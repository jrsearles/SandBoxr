var objectFactory = require("../types/object-factory");

module.exports = function (context) {
	return context.result(objectFactory.createFunction(context.node));
};
