module.exports = function ThisExpression (context) {
	return context.result(context.env.current.thisNode);
};
