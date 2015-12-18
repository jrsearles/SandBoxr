import {UNDEFINED} from "../types/primitive-type";

export default function* BinaryExpression (node, context, next) {
	let left = (yield next(node.left, context)).result;
	let leftValue = left.getValue() || UNDEFINED;

	let right = (yield next(node.right, context)).result;
	let rightValue = right.getValue() || UNDEFINED;

	let op = node.operator;
	let newValue = yield context.env.ops[op](leftValue, rightValue);

	return context.result(context.env.objectFactory.createPrimitive(newValue));
}
