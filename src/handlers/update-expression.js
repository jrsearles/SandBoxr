var objectFactory = require("../types/object-factory");

module.exports = function UpdateExpression (context) {
	var executionResult = context.create(context.node.argument).execute();
	var originalValue = executionResult.result;
	var newValue = originalValue.toNumber();

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
	var obj = executionResult.object || context.scope;
	var name = executionResult.name;

	obj.setProperty(name, newValue);
	return context.result(context.node.prefix ? newValue : originalValue, name, obj);
};
