import {toBoolean} from "../utils/native";

export default function* LogicalExpression (context) {
	let left = yield context.create(context.node.left).execute();
	let passed = toBoolean(left.result.getValue());

	if (passed && context.node.operator === "||") {
		return left;
	}

	if (!passed && context.node.operator === "&&") {
		return left;
	}

	return yield context.create(context.node.right).execute();
}
