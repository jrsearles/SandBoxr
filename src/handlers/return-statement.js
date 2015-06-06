module.exports = function ReturnStatement (context) {
	var returnValue = context.node.argument ? context.create(context.node.argument).execute().result : context.scope.global.getProperty("undefined");
	return context.exit(returnValue);
};
