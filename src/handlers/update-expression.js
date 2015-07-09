var convert = require("../utils/convert");

module.exports = function UpdateExpression (context) {
	var objectFactory = context.env.objectFactory;
	var ref = context.create(context.node.argument).execute().result;
	var originalValue = convert.toNumber(context, ref.getValue());
	var newValue = originalValue;

	if (context.node.operator === "++") {
		newValue++;
	} else {
		newValue--;
	}

	newValue = objectFactory.createPrimitive(newValue);
	originalValue = objectFactory.createPrimitive(originalValue);

	// var obj = executionResult.object || context.env;
	// var name = executionResult.name;
	var returnValue = context.node.prefix ? newValue : originalValue;

	ref.putValue(newValue);
	// obj.putValue(name, newValue, false, context);
	return context.result(returnValue);
};
