module.exports = function FunctionExpression (context) {
	var ctor = context.scope.global.getValue("Function");
	var objectFactory = context.scope.global.factory;
	var proto = objectFactory.createObject();
	var func = objectFactory.createFunction(context.node, context.scope, proto, ctor);

	// todo:
	if (context.node.id /* && context.node.expression */) {
		context.scope.putValue(context.node.id.name, func);
	}

	return context.result(func);
};
