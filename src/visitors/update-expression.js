import * as convert from "../utils/convert";
import * as contracts from "../utils/contracts";
import {degenerate} from "../utils/async";

export default degenerate(function* UpdateExpression (context) {
	var objectFactory = context.env.objectFactory;
	var ref = (yield context.create(context.node.argument).execute()).result;
	contracts.assertIsValidAssignment(ref, context.env.isStrict());
	
	var originalValue = convert.toNumber(context.env, ref.getValue());
	var newValue = originalValue;

	if (context.node.operator === "++") {
		newValue++;
	} else {
		newValue--;
	}

	newValue = objectFactory.createPrimitive(newValue);
	originalValue = objectFactory.createPrimitive(originalValue);

	var returnValue = context.node.prefix ? newValue : originalValue;

	ref.setValue(newValue);
	return context.result(returnValue);
});
