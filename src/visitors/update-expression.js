import {toNumber} from "../utils/native";
import * as contracts from "../utils/contracts";

export default function* UpdateExpression (context) {
	const objectFactory = context.env.objectFactory;
	let ref = (yield context.create(context.node.argument).execute()).result;
	contracts.assertIsValidAssignment(ref, context.env.isStrict());

	let originalValue = yield toNumber(context.env, ref.getValue());
	let newValue = originalValue;

	if (context.node.operator === "++") {
		newValue++;
	} else {
		newValue--;
	}

	let newWrappedValue = objectFactory.createPrimitive(newValue);
	originalValue = objectFactory.createPrimitive(originalValue);

	let returnValue = context.node.prefix ? newWrappedValue : originalValue;

	ref.setValue(newWrappedValue);
	return context.result(returnValue);
}
