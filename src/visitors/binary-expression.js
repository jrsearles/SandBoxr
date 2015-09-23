import {UNDEFINED} from "../types/primitive-type";

export default function* BinaryExpression (context) {
	let left = (yield context.create(context.node.left).execute()).result;
	let leftValue = left.getValue() || UNDEFINED;

	let right = (yield context.create(context.node.right).execute()).result;
	let rightValue = right.getValue() || UNDEFINED;

	let op = context.node.operator;
	let newValue = yield context.env.ops[op](leftValue, rightValue);

	return context.result(context.env.objectFactory.createPrimitive(newValue));
}
