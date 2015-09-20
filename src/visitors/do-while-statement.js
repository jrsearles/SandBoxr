import * as convert from "../utils/convert";

export default function* DoWhileStatement (context) {
	let result, priorResult;
	let passed = true;

	if (context.node.type === "WhileStatement") {
		passed = convert.toBoolean((yield context.create(context.node.test).execute()).result.getValue());
	}

	while (passed) {
		result = yield context.create(context.node.body).execute();
		if (result && result.shouldBreak(context, true, priorResult)) {
			return result;
		}

		passed = convert.toBoolean((yield context.create(context.node.test).execute()).result.getValue());
		priorResult = result;
	}

	return result;
}
