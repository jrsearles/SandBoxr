import {each} from "../utils/async";

export default function* BlockStatement (context) {
	let result, priorResult;

	if (context.node.type === "Program") {
		context.env.current.init(context.node);
	}

	yield* each(context.node.body, function* (node, i, body, abort) {
		result = yield context.create(node).execute();
		if (result.shouldBreak(context, false, priorResult)) {
			abort();
		}

		priorResult = result;
	});

	return result;
}
