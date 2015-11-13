import {toNumber} from "../utils/native";
import {assertIsValidAssignment} from "../utils/contracts";

export default function* UpdateExpression (context) {
	const objectFactory = context.env.objectFactory;
	let ref = (yield context.create(context.node.argument).execute()).result;
	assertIsValidAssignment(ref, context.env.isStrict());

	let originalValue = yield toNumber(ref.getValue());
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
