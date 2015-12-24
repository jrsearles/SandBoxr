import {toBoolean} from "../utils/native";
import {isNullOrUndefined} from "../utils/contracts";
import {declare} from "../utils/assign";

export default function* ForInStatement (node, context, next) {
	let obj = (yield next(node.right, context)).result.getValue();
	
	if (isNullOrUndefined(obj)) {
		return context.empty();
	}

	context = context.createLoop();
	
	let it = obj.getIterator(context.env);
	let advance = it.getValue("next");
	let done = false;
	let result, priorResult;

	while (!done) {
    let scope = context.env.createBlockScope(node);
		let itResult = yield advance.call(it);
		done = toBoolean(itResult.getValue("done"));

		if (!done && itResult.has("value")) {
			yield declare(context.env, node.left, itResult.getValue("value"));
			// left.setValue(itResult.getValue("value"));
			
			result = yield next(node.body, context);
			if (context.shouldBreak(result)) {
				scope.exit();
				return context.abrupt(result, priorResult);
			}
		}

		scope.exit();
		priorResult = result;
	}
  
	return result || context.empty();
}
