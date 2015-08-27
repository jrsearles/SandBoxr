import * as contracts from "../utils/contracts";
import operators from "../utils/operators";
import {degenerate} from "../utils/async";

export default degenerate(function* AssignmentExpression (context) {
	let assignment = context.node.operator === "=";
	let right = (yield context.create(context.node.right).execute()).result;
	let left = (yield context.create(context.node.left).execute()).result;
	
	contracts.assertIsValidAssignment(left, context.env.isStrict());

	let newValue;
	if (assignment) {
		newValue = right.getValue();
	} else {
		// remove equals
		let op = context.node.operator.slice(0, -1);
		let rawValue = operators[op](context.env, left.getValue(), right.getValue());
		newValue = context.env.objectFactory.createPrimitive(rawValue);
	}

	left.putValue(newValue);
	return context.result(newValue);
});
