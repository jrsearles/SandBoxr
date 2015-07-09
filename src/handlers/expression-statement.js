module.exports = 	function ExpressionStatement (context) {
	var executionResult = context.create(context.node.expression).execute();
	var executionValue = executionResult && executionResult.result && executionResult.result.getValue();
	return context.result(executionValue || context.env.global.getProperty("undefined").getValue());
};
