var convert = require("../utils/convert");

module.exports = function UpdateExpression (context) {
	var objectFactory = context.env.objectFactory;
	var ref = context.create(context.node.argument).execute().result;
	var originalValue = convert.toNumber(context.env, ref.getValue());
	var newValue = originalValue;

	if (context.node.operator === "++") {
		newValue++;
	} else {
		newValue--;
	}

	newValue = objectFactory.createPrimitive(newValue);
	originalValue = objectFactory.createPrimitive(originalValue);

	var returnValue = context.node.prefix ? newValue : originalValue;

	ref.putValue(newValue);
	return context.result(returnValue);
};
