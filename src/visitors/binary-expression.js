import * as operators from "../utils/operators";
import {degenerate} from "../utils/async";

export default degenerate(function* BinaryExpression (context) {
	let undef = context.env.global.getValue("undefined");
	let left = (yield context.create(context.node.left).execute()).result;
	let leftValue = left.getValue() || undef;

	let right = (yield context.create(context.node.right).execute()).result;
	let rightValue = right.getValue() || undef;

	let newValue;
	if (context.node.operator in operators) {
		newValue = operators[context.node.operator](context.env, leftValue, rightValue);
	} else {
		newValue = context.env.evaluate(leftValue, rightValue, context.node.operator);
	}

	return context.result(context.env.objectFactory.createPrimitive(newValue));
});
