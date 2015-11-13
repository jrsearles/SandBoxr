import {assign} from "../utils/assign";

export default function* AssignmentExpression (context) {
	let right = (yield context.create(context.node.right).execute()).result;
	let rightValue = right.getValue();

	if (context.node.operator === "=") {
		yield assign(context.env, context.node.left, rightValue);
	} else {
		let left = (yield context.create(context.node.left).execute()).result;

		// remove equals
		let op = context.node.operator.slice(0, -1);

		let nativeValue = yield context.env.ops[op](left.getValue(), rightValue);
		rightValue = context.env.objectFactory.createPrimitive(nativeValue);
		left.setValue(rightValue, context.env.isStrict());
	}

	return context.result(rightValue);
}
