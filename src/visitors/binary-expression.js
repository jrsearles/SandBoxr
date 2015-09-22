import * as operators from "../utils/operators";
import * as comparers from "../utils/comparers";
import {UNDEFINED} from "../types/primitive-type";

export default function* BinaryExpression (context) {
	let left = (yield context.create(context.node.left).execute()).result;
	let leftValue = left.getValue() || UNDEFINED;

	let right = (yield context.create(context.node.right).execute()).result;
	let rightValue = right.getValue() || UNDEFINED;

	let newValue;
	if (context.node.operator in operators) {
		newValue = yield operators[context.node.operator](context.env, leftValue, rightValue);
	} else {
		newValue = yield comparers[context.node.operator](context.env, leftValue, rightValue);
	}

	return context.result(context.env.objectFactory.createPrimitive(newValue));
}
