module.exports = function ReturnStatement (context) {
	if (context.node.argument) {
		return context.exit(context.create(context.node.argument).execute().result);
	}

	return context.exit(context.scope.global.getValue("undefined"));
};
