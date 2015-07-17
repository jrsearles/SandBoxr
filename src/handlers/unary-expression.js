var Reference = require("../env/reference");
var convert = require("../utils/convert");

module.exports = function UnaryExpression (context) {
	var result = context.create(context.node.argument).execute().result;
	var objectFactory = context.env.objectFactory;
	var value, newValue;

	switch (context.node.operator) {
		case "typeof":
			var type;
			if (result instanceof Reference && result.isUnresolved()) {
				type = "undefined";
			} else {
				value = result.getValue();
				type = value ? value.type : "undefined";
			}

			newValue = objectFactory.createPrimitive(type);
			break;

		case "-":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(-(convert.toNumber(context.env, value)));
			break;

		case "+":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(+(convert.toNumber(context.env, value)));
			break;

		case "!":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(!(value.isPrimitive ? value.toBoolean() : true));
			break;

		case "~":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(~(convert.toInt32(context.env, value)));
			break;

		case "delete":
			var deleted = true;
			if (result && result instanceof Reference) {
				if (!result.isUnresolved()) {
					deleted = result.deleteBinding(result.name);
				}
			} else if (context.node.argument.object) {
				throw new ReferenceError(context.node.argument.object.name + " is not defined");
			}

			newValue = objectFactory.createPrimitive(deleted);
			break;

		case "void":
			newValue = objectFactory.createPrimitive(undefined);
			break;

		default:
			throw new SyntaxError("Unknown unary operator: " + context.node.operator);
	}

	return context.result(newValue);
};
