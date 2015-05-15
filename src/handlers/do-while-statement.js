module.exports = function DoWhileStatement (context) {
	var result;
	var passed = true;

	if (context.node.type === "WhileStatement") {
		passed = context.create(context.node.test).execute().result.toBoolean();
	}

	while (passed) {
		result = context.create(context.node.body).execute();
		passed = context.create(context.node.test).execute().result.toBoolean();
	}

	return result;
};
