var objectFactory = require("../types/object-factory");

module.exports = function (context) {
	var obj = context.create(context.node.argument).execute().result;
	var originalValue = obj.value;
	var newValue = obj.value;
	var returnValue;

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

	obj.value = newValue;
	returnValue = objectFactory.createPrimitive(context.node.prefix ? newValue : originalValue);
	return context.result(returnValue, null, obj);
};
