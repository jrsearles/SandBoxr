module.exports = function (context) {
	var result;

	function errorHandler (err) {
		if (err && context.node.handler) {
			var scope = context.scope.createScope();
			scope.setProperty(context.node.handler.param.id, err);

			result = context.create(context.node.handler.body).execute();
		}

		context.endTry();

		if (context.node.finalizer) {
			context.create(context.node.finalizer).execute();
		}

		return result;
	}

	context.beginTry(errorHandler);
	result = context.create(context.node.block).execute();

	errorHandler();
	return result;
};
