import {toBoolean} from "../utils/native";
import {isNullOrUndefined} from "../utils/contracts";

export default function* ForInStatement (node, context, next) {
	context = context.createLoop();
	
	let left;
	if (node.left.isVariableDeclaration()) {
		// should only be one, but
		// need to unwrap the declaration to get it
		// todo: this is sloppy - need to revisit
		for (let decl of node.left.declarations) {
			left = (yield next(decl, context)).result;
		}
	} else {
		left = (yield next(node.left, context)).result;
	}

	let obj = (yield next(node.right, context)).result.getValue();
	
	if (isNullOrUndefined(obj)) {
		return context.empty();
	}

	let it = obj.getIterator(context.env);
	let advance = it.getValue("next");
	let done = false;
	let result, priorResult;

	while (!done) {
		let itResult = yield advance.call(it);
		done = toBoolean(itResult.getValue("done"));

		if (!done && itResult.has("value")) {
			left.setValue(itResult.getValue("value"));
			
			result = yield next(node.body, context);
			if (context.shouldBreak(result)) {
				return context.abrupt(result, priorResult);
			}
		}

		priorResult = result;
	}

	return result || context.empty();
}
