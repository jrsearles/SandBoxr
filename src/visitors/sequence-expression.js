import {each} from "../utils/async";

export default function* SequenceExpression (context) {
	let value;

	yield each(context.node.expressions, function* (expr) {
		value = (yield context.create(expr).execute()).result.getValue();
	});

	return context.result(value);
}
