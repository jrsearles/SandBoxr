import {degenerate} from "../utils/async";
import * as contracts from "../utils/contracts";

export default degenerate(function* TryStatement (context) {
	let result, uncaughtError;
	
	try {
		result = yield context.create(context.node.block).execute();
	} catch (err) {
		if (context.node.handler) {
			let caughtError = err && err.wrappedError || context.env.objectFactory.createPrimitive(err);
			let errVar = context.node.handler.param.name;

			contracts.assertIsValidIdentifier(errVar, context.env.isStrict());
			
			let scope = context.env.createScope();
			context.env.createVariable(errVar);
			context.env.putValue(errVar, caughtError);
			
			result = yield scope.use(() => {
				try {
					return context.create(context.node.handler.body, context.node.handler).execute();
				} catch (catchError) {
					uncaughtError = catchError;
				}
			});
		} else {
			uncaughtError = err;
		}
	} finally {
		if (context.node.finalizer) {
			let finalResult = yield context.create(context.node.finalizer).execute();
			if (finalResult && finalResult.shouldBreak(context)) {
				return finalResult;
			}
		}
	}

	if (uncaughtError) {
		throw uncaughtError;
	}

	return result;
});
