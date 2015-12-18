import {each} from "../utils/async";

export default function* SequenceExpression (node, context, next) {
	let value;

	yield each(node.expressions, function* (expr) {
		value = (yield next(expr, context)).result.getValue();
	});

	return context.result(value);
}
