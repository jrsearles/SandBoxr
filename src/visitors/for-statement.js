import {toBoolean} from "../utils/native";

function* shouldContinue (node, context, next) {
	if (!node) {
		return true;
	}

	return toBoolean((yield next(node, context)).result.getValue());
}

export default function* ForStatement (node, context, next) {
	context = context.createLoop();
	
	let scope = context.env.createBlockScope(node);
	if (node.init) {
		yield next(node.init, context);
	}

	let result, priorResult;
	
	while (yield shouldContinue(node.test, context, next)) {
		result = yield next(node.body, context);

		if (context.shouldBreak(result)) {
			return context.abrupt(result, priorResult);
		}

		priorResult = result;
		scope = yield scope.reset(node.init);
		
		if (node.update) {
			yield next(node.update, context);
		}
	}

	scope.exit();
	return result || context.empty();
}
