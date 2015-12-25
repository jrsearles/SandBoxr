import {isNullOrUndefined} from "../utils/contracts";
import {declare} from "../utils/assign";
import iterate from "../iterators/";

export default function* ForOfStatement (node, context, next) {
	let obj = (yield next(node.right, context)).result.getValue();
	
	if (isNullOrUndefined(obj)) {
		return context.empty();
	}

	context = context.createLoop();
	
	let it = iterate.getIterator(obj);  // obj.getIterator(context.env);
	// let advance = it.getValue("next");
	let done = false;
	let result, priorResult;

	while (!done) {
		let scope = context.env.createBlockScope(node);
		let current;
		
		({done, value: current} = it.next());
		
		if (!done) {
			yield declare(context.env, node.left, current.value);
			
			result = yield next(node.body, context);
			if (context.shouldBreak(result)) {
				done = true;
				result = context.abrupt(result, priorResult);
			}
		}
		
		if (done) {
			it.return();
		}
		
		scope.exit();
		priorResult = result;
	}

	return result || context.empty();
}
