import * as convert from "../utils/convert";
import {degenerate} from "../utils/async";

export default degenerate(function* DoWhileStatement (context) {
	var result, priorResult;
	var passed = true;
	
	if (context.node.type === "WhileStatement") {
		passed = convert.toBoolean((yield context.create(context.node.test).execute()).result.getValue());
	}
	
	while (passed) {
		result = yield context.create(context.node.body).execute();
		if (result && result.shouldBreak(context, true, priorResult)) {
			return result;
		}
		
		passed = convert.toBoolean((yield context.create(context.node.test).execute()).result.getValue());
		priorResult = result;
	}
	
	return result;
});
