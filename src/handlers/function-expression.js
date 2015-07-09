module.exports = function FunctionExpression (context) {
	var ctor = context.env.global.getProperty("Function").getValue();
	var objectFactory = context.env.objectFactory;
	var proto = objectFactory.createObject();
	var func = objectFactory.createFunction(context.node, context.env.current, proto, ctor);

	// todo:
	if (context.node.id /* && context.node.expression */) {
		context.env.putValue(context.node.id.name, func);
	}

	return context.result(func);
};
