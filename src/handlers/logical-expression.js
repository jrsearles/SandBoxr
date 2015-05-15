module.exports = function LogicalExpression (context) {
	var left = context.create(context.node.left).execute();
	var passed = left.result.toBoolean();
	if (passed && context.node.operator === "||") {
		return left;
	}

	if (!passed && context.node.operator === "&&") {
		return left;
	}

	return context.create(context.node.right).execute();
};
