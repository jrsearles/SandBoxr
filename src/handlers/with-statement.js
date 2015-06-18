module.exports = function WithStatement (context) {
	var obj = context.create(context.node.object).execute().result;

	// context.scope.startWith(obj);
	// var result = context.create(context.node.body).execute();
	// context.scope.endWith();

	var result = context.create(context.node.body, null, context.scope.withObject(obj)).execute();
	return result;
};
