export default function FunctionExpression (context) {
	var objectFactory = context.env.objectFactory;
	var func = objectFactory.createFunction(context.node);
	func.bindScope(context.env.current);

	if (context.node.id) {
		func.name = context.node.id.name;
	}

	return context.result(func);
}
