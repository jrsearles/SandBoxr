export default function* BlockStatement (context) {
	let result, priorResult;

	if (context.node.type === "Program") {
		context.env.current.init(context.node);
	}

	for (let current of context.node.body) {
		result = yield context.create(current).execute();
		if (result.shouldBreak(context, false, priorResult)) {
			return result;
		}

		priorResult = result;
	}

	return result;
}
