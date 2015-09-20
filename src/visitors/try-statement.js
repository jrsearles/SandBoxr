import * as contracts from "../utils/contracts";

function* executeBlock (context, body, swallow) {
	let result;

	for (let node of body) {
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
			break;
		}
	}

	return result;
}

export default function* TryStatement (context) {
	let result = yield executeBlock(context, context.node.block.body, true);

	if (result && result.raised) {
		if (context.node.handler) {
			let errVar = context.node.handler.param.name;
			contracts.assertIsValidIdentifier(errVar, context.env.isStrict());

			let scope = context.env.createScope();
			context.env.createVariable(errVar);
			context.env.putValue(errVar, result.result);

			result = yield scope.use(function* () {
				return yield executeBlock(context, context.node.handler.body.body, true);
			});
		}
	}

	// if there is no catch OR if an error is raised within the catch we need to pass that on
	if (result && result.raised) {
		yield result;
	}

	if (context.node.finalizer) {
		let finalizerResult = yield executeBlock(context, context.node.finalizer.body);
		if (finalizerResult && finalizerResult.canBreak()) {
			return finalizerResult;
		}
	}

	return result;
}
