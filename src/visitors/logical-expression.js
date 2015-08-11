import * as convert from "../utils/convert";
import {degenerate} from "../utils/async";

export default degenerate(function* LogicalExpression (context) {
	var left = yield context.create(context.node.left).execute();
	var passed = convert.toBoolean(left.result.getValue());

	if (passed && context.node.operator === "||") {
		return left;
	}

	if (!passed && context.node.operator === "&&") {
		return left;
	}

	return yield context.create(context.node.right).execute();
});
