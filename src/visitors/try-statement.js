import {assertIsValidIdentifier} from "../utils/contracts";
import {each} from "../utils/async";

function* executeBlock (context, body, swallow) {
	let result;

	yield each(body, function* (node, i, all, abort) {
		if (swallow) {
			try {
				result = yield context.create(node).execute();
			} catch (thrownError) {
				result = context.raise(thrownError);
			}
		} else {
			result = yield context.create(node).execute();
		}

		if (result.canBreak()) {
			abort();
		}
	});

	return result;
}

export default function* TryStatement (context) {
	let result = yield executeBlock(context, context.node.block.body, true);
	let finalizerResult;
	// let shouldRaise = false;
	// let shouldReturn = false;

	if (result && result.raised) {
		if (context.node.handler) {
			let errVar = context.node.handler.param.name;
			assertIsValidIdentifier(errVar, context.env.isStrict());

			let scope = context.env.createScope();
			context.env.createVariable(errVar);
			context.env.setValue(errVar, result.result);

			result = yield scope.use(function* () {
				return yield executeBlock(context, context.node.handler.body.body, true);
			});
		}
	}

	if (!context.node.finalizer) {
		return result;
	}

	// let shouldThrow = result && result.raised;

	// if there is no catch OR if an error is raised within the catch we need to pass that on
	// if (result && result.raised) {
	// 	shouldRaise = true;
	// 	// yield result;
	// }

	if (context.node.finalizer) {
		finalizerResult = yield executeBlock(context, context.node.finalizer.body);
		if (finalizerResult && finalizerResult.canBreak()) {
			return finalizerResult;
			// shouldReturn = true;
		}
	}

	// if (shouldRaise) {
	// 	try {
	// 		throw result.result;
	// 	} catch (err) {
	// 		throw err;
	// 	} finally {
	// 		if (shouldReturn) {
	// 			return finalizerResult;
	// 		}
	// 	}
	// }

	return result;
}
