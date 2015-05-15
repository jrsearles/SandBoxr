module.exports = 	function ExpressionStatement (context) {
	return context.create(context.node.expression).execute();
};
