var objectFactory = require("../types/object-factory");

module.exports = function UnaryExpression (context) {
	var result = context.create(context.node.argument).execute();
	var value = result.result;
	var newValue;

	switch (context.node.operator) {
		case "typeof":
			newValue = objectFactory.createPrimitive(value.type);
			break;

		case "-":
			newValue = objectFactory.createPrimitive(-value.toNumber());
			break;

		case "+":
			newValue = objectFactory.createPrimitive(value.toNumber());
			break;

		case "!":
			newValue = objectFactory.createPrimitive(!value.toBoolean());
			break;

		case "~":
			newValue = objectFactory.createPrimitive(~value.toNumber());
			break;

		case "delete":
			newValue = objectFactory.createPrimitive(result.object.deleteProperty(result.name));
			break;

		case "void":
			newValue = objectFactory.createPrimitive(undefined);
			break;

		default:
			throw new TypeError("Unknown unary operator: " + context.node.operator);
	}

	return context.result(newValue);
};
