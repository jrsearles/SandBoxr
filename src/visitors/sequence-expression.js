module.exports = function SequenceExpression (context) {
	var value;

	context.node.expressions.forEach(expr => {
		value = context.create(expr).execute().result.getValue();
	});

	return context.result(value);
};
