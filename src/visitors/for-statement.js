import {toBoolean} from "../utils/native";

function* shouldContinue (node, context, next) {
	if (!node) {
		return true;
	}

	return toBoolean((yield next(node, context)).result.getValue());
}

export default function* ForStatement (node, context, next) {
	context = context.createLoop();
	
	if (node.init) {
		yield next(node.init, context);
	}

	let result, priorResult;
	while (yield shouldContinue(node.test, context, next)) {
		result = yield next(node.body, context);

		if (context.shouldBreak(result)) {
			return context.abrupt(result, priorResult);
		}

		if (node.update) {
			yield next(node.update, context);
		}

		priorResult = result;
	}

	return result || context.empty();
}
