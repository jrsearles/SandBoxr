import * as operators from "../utils/operators";
import {degenerate} from "../utils/async";

export default degenerate(function* BinaryExpression (context) {
	var undef = context.env.global.getValue("undefined");
	var left = (yield context.create(context.node.left).execute()).result;
	var leftValue = left.getValue() || undef;

	var right = (yield context.create(context.node.right).execute()).result;
	var rightValue = right.getValue() || undef;

	var newValue;
	if (context.node.operator in operators) {
		newValue = operators[context.node.operator](context.env, leftValue, rightValue);
	} else {
		newValue = context.env.evaluate(leftValue, rightValue, context.node.operator);
	}

	return context.result(context.env.objectFactory.createPrimitive(newValue));
});
