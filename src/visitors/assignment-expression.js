import {assign} from "../utils/assign";

export default function* AssignmentExpression (node, context, next) {
	let right = (yield next(node.right, context)).result;
	let rightValue = right.getValue();

	if (node.operator === "=") {
		yield assign(context.env, node.left, rightValue);
	} else {
		let left = (yield next(node.left, context)).result;

		// remove equals
		let op = node.operator.slice(0, -1);

		let nativeValue = yield context.env.ops[op](left.getValue(), rightValue);
		rightValue = context.env.objectFactory.createPrimitive(nativeValue);
		left.setValue(rightValue, context.env.isStrict());
	}

	return context.result(rightValue);
}
