import {each} from "../utils/async";

export default function* BlockStatement (node, context, next) {
	context = context.create();
	let result, priorResult;

	if (node.isProgram()) {
		context.env.current.init(node);
	}

	yield* each(node.body, function* (child, i, body, abort) {
		result = yield next(child, context);
		
		if (context.shouldBreak(result)) {
			abort();
			result = context.abrupt(result, priorResult);
		}

		priorResult = result;
	});

	return result;
}
