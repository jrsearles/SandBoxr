var objectFactory = require("../types/object-factory");

module.exports = function FunctionExpression (context) {
	return context.result(objectFactory.createFunction(context.node, context.scope));
};
