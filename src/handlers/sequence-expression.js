module.exports = function (context) {
	var value;

	context.node.expressions.forEach(function (expr) {
		value = context.create(expr).execute();
	});

	return value;
};
