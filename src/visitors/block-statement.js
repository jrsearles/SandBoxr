import {each} from "../utils/async";

export default function* BlockStatement (node, context, next) {
	context = context.create();
	
	let scope = context.env.createBlockScope(node);
	return yield scope.use(function* () {
		let result, priorResult;

		yield* each(node.body, function* (child, i, body, abort) {
			result = yield next(child, context);
			
			if (context.shouldBreak(result)) {
				abort();
				result = context.abrupt(result, priorResult);
			}
	
			priorResult = result;
		});
	
		return result;
	});
}
