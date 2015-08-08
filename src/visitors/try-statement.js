export default function TryStatement (context) {
	var result, uncaughtError;

	try {
		result = context.create(context.node.block).execute();
	} catch (err) {
		if (context.node.handler) {
			let caughtError = err && err.wrappedError || context.env.objectFactory.createPrimitive(err);

			var scope = context.env.createScope();
			// context.env.initScope(context.node.handler);
			// scope.init(context.node.handler.body);

			let errVar = context.node.handler.param.name;
			// let hasVariable = context.env.hasVariable(errVar);

			// if (!hasVariable) {
				context.env.createVariable(errVar);
			// }

			context.env.putValue(errVar, caughtError);

			try {
				result = context.create(context.node.handler.body, context.node.handler).execute();
			} catch (catchError) {
				// scope.exitScope();
				uncaughtError = catchError;
			} finally {
				// if (!hasVariable) {
				// 	context.env.deleteVariable(errVar);
				// }
			}

			scope.exitScope();
		} else {
			uncaughtError = err;
		}
	} finally {
		if (context.node.finalizer) {
			let finalResult = context.create(context.node.finalizer).execute();
			if (finalResult && finalResult.shouldBreak(context)) {
				return finalResult;
			}
		}
	}

	if (uncaughtError) {
		throw uncaughtError;
	}

	return result;
}
