import * as operators from "../utils/operators";

export default function BinaryExpression (context) {
	var undef = context.env.global.getProperty("undefined").getValue();
	var left = context.create(context.node.left).execute().result;
	var leftValue = left.getValue() || undef;

	var right = context.create(context.node.right).execute().result;
	var rightValue = right.getValue() || undef;

	var newValue;
	if (context.node.operator in operators) {
		newValue = operators[context.node.operator](context.env, leftValue, rightValue);
	} else {
		newValue = context.env.evaluate(leftValue, rightValue, context.node.operator);
	}

	return context.result(context.env.objectFactory.createPrimitive(newValue));
}
