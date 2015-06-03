module.exports = function WithStatement (context) {
	var obj = context.create(context.node.object).execute().result;
	return context.create(context.node.body, null, context.scope.withObject(obj)).execute();
};
