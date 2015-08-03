import * as convert from "../utils/convert";

function shouldContinue (context) {
	if (!context.node.test) {
		return true;
	}

	return convert.toBoolean(context.create(context.node.test).execute().result.getValue());
}

export default function ForStatement (context) {
	if (context.node.init) {
		context.create(context.node.init).execute();
	}

	var result, priorResult;
	while (shouldContinue(context)) {
		result = context.create(context.node.body).execute();
		if (result && result.shouldBreak(context, true, priorResult)) {
			return result;
		}

		if (context.node.update) {
			context.create(context.node.update).execute();
		}

		priorResult = result;
	}

	return result;
}
