module.exports = function TryCatchStatement (context) {
	var result;

	try {
		result = context.create(context.node.block).execute();
	} catch (err) {
		if (context.node.handler) {
			var caughtError = err && err.wrappedError || context.env.objectFactory.createPrimitive(err);

			// var scope = context.env.createScope();
			// scope.init(context.node.handler.body);

			var errVar = context.node.handler.param.name;
			var hasBinding = context.env.hasBinding(errVar);

			if (!hasBinding) {
				context.env.createBinding(errVar);
			}

			context.env.setBinding(errVar, caughtError);

			try {
				result = context.create(context.node.handler.body, context.node.handler).execute();
			} catch (catchError) {
				// scope.exitScope();
				throw catchError;
			} finally {
				if (!hasBinding) {
					context.env.deleteBinding(errVar);
				}
			}

			// scope.exitScope();
		} else {
			throw err;
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
