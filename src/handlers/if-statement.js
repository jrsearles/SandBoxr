module.exports = function IfStatement (context) {
	var testValue = context.create(context.node.test).execute().result.getValue();
	if (testValue.toBoolean()) {
		return context.create(context.node.consequent).execute();
	}

	if (context.node.alternate) {
		return context.create(context.node.alternate).execute();
	}
};
