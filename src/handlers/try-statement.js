module.exports = function (context) {
	var result;

	try {
		result = context.create(context.node.block).execute();
	} catch (err) {
		if (context.node.handler) {
			var scope = context.scope.createScope();
			var caughtError = err.wrappedError || context.scope.global.factory.createPrimitive(err);
			scope.putValue(context.node.handler.param.name, caughtError, false, context);

			result = context.create(context.node.handler.body, context.node.handler, scope).execute();
		}
	} finally {
		if (context.node.finalizer) {
			var finalResult = context.create(context.node.finalizer).execute();

			if (finalResult && finalResult.shouldBreak(context)) {
				return finalResult;
			}
		}
	}

	return result;
};
