var objectFactory = require("../types/object-factory");

module.exports = function FunctionExpression (context) {
	var ctor = context.scope.global.getValue("Function");
	var proto = objectFactory.createObject();
	var func = objectFactory.createFunction(context.node, context.scope, proto, ctor);

	return context.result(func);
};
