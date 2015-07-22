module.exports = function FunctionExpression (context) {
	var objectFactory = context.env.objectFactory;
	var proto = objectFactory.createObject();
	var func = objectFactory.createFunction(context.node, context.env.current, proto);

	if (context.node.id) {
		func.name = context.node.id.name;
	}

	return context.result(func);
};
