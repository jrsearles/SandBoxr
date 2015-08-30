import * as convert from "../utils/convert";
import {degenerate} from "../utils/async";

export default degenerate(function* LogicalExpression (context) {
	let left = yield context.create(context.node.left).execute();
	let passed = convert.toBoolean(left.result.getValue());

	if (passed && context.node.operator === "||") {
		return left;
	}

	if (!passed && context.node.operator === "&&") {
		return left;
	}

	return yield context.create(context.node.right).execute();
});
