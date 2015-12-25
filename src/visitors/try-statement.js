import {assertIsValidIdentifier} from "../utils/contracts";
import {each} from "../utils/async";
import {declare} from "../utils/assign";

function* tryCatch (node, context, next) {
	try {
		return yield next(node, context);
	} catch (thrownError) {
		return context.raise(thrownError);
	}
}

function* executeBlock (context, body, swallow, next) {
	let result;

	yield each(body, function* (node, i, all, abort) {
		if (swallow) {
			result = yield* tryCatch(node, context, next);
		} else {
			result = yield next(node, context);
		}

		if (result.isAbrupt()) {
			abort();
		}
	});

	return result;
}

export default function* TryStatement (node, context, next) {
	let result = yield executeBlock(context, node.block.body, true, next);
	let finalizerResult;
	// let shouldRaise = false;
	// let shouldReturn = false;

	if (result && result.raised) {
		if (node.handler) {
			// todo: isn't this check already handled?
			let errVar = node.handler.param.name;
			assertIsValidIdentifier(errVar, context.env.isStrict());
			
			let scope = context.env.createScope();
			// context.env.createVariable(errVar);
			// context.env.setValue(errVar, result.result);
			yield declare(context.env, node.handler.param, result.result);
			
			result = yield scope.use(function* () {
				return yield executeBlock(context, node.handler.body.body, true, next);
			});
		}
	}

	// result = result || context.empty();
	// if (!node.finalizer) {
	// 	return result;
	// }

	// let shouldThrow = result && result.raised;

	// if there is no catch OR if an error is raised within the catch we need to pass that on
	// if (result && result.raised) {
	// 	shouldRaise = true;
	// 	// yield result;
	// }

	if (node.finalizer) {
		finalizerResult = yield executeBlock(context, node.finalizer.body, false, next);
		if (finalizerResult && finalizerResult.isAbrupt()) {
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

	return result || context.empty();
}
