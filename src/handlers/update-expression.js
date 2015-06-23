var convert = require("../utils/convert");

module.exports = function UpdateExpression (context) {
	var objectFactory = context.scope.global.factory;
	var executionResult = context.create(context.node.argument).execute();
	var originalValue = convert.toNumber(context, executionResult.result);
	var newValue = originalValue;

	switch (context.node.operator) {
		case "++":
			newValue++;
			break;

		case "--":
			newValue--;
			break;

		default:
			throw new Error("Unexpected update operator: " + context.node.operator);
	}

	newValue = objectFactory.createPrimitive(newValue);
	originalValue = objectFactory.createPrimitive(originalValue);

	var obj = executionResult.object || context.scope;
	var name = executionResult.name;
	var returnValue = context.node.prefix ? newValue : originalValue;

	obj.putValue(name, newValue);
	return context.result(returnValue, name, obj);
};
