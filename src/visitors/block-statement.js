import {degenerate} from "../utils/async";

export default degenerate(function* BlockStatement (context) {
	let result, priorResult;
	
	if (context.node.type === "Program") {
		context.env.initScope(context.node);
	}
	
	for (let current of context.node.body) {
		result = yield context.create(current).execute();
		if (result && result.shouldBreak(context, false, priorResult)) {
			return result;
		}
		
		priorResult = result;
	}
	
	return result;
});
