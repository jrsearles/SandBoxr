import {assign} from "../utils/assign";

export default function* AssignmentExpression (node, context, next) {
	let rightValue;
	
	if (node.operator === "=") {
		let right = (yield next(node.right, context)).result;
		rightValue = right.getValue();

		yield assign(context.env, node.left, rightValue);
	} else {
		let left = (yield next(node.left, context)).result;
		let right = (yield next(node.right, context)).result;
		rightValue = right.getValue();

		// remove equals
		let op = node.operator.slice(0, -1);

		let nativeValue = yield context.env.ops[op](left.getValue(), rightValue);
		rightValue = context.env.objectFactory.createPrimitive(nativeValue);
		left.setValue(rightValue, context.env.isStrict());
	}

	return context.result(rightValue);
}
