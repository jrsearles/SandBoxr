export default function* SequenceExpression (context) {
	let value;

	for (let expr of context.node.expressions) {
		value = (yield context.create(expr).execute()).result.getValue();
	}

	return context.result(value);
}
