var objectFactory = require("../types/object-factory");
var utils = require("../utils");
var Scope = require("../scope/scope");

var safeOperators = {
	"typeof": true,
	"delete": true
};

function getArgument (context) {
	if (safeOperators[context.node.operator]) {
		// when checking typeof the argument might not exist
		// todo: this is ugly - need to come up with better strategy
		try {
			return context.create(context.node.argument).execute();
		} catch (ex) {
			if (ex instanceof ReferenceError) {
				return undefined;
			}

			throw ex;
		}
	}

	return context.create(context.node.argument).execute();
}

module.exports = function UnaryExpression (context) {
	var result = getArgument(context);
	var value = result && result.result;
	var newValue;

	switch (context.node.operator) {
		case "typeof":
			newValue = result ? objectFactory.createPrimitive(value.type) : objectFactory.createPrimitive("undefined");
			break;

		case "-":
			newValue = objectFactory.createPrimitive(-(utils.toPrimitive(context, value)));
			break;

		case "+":
			newValue = objectFactory.createPrimitive(+(utils.toPrimitive(context, value)));
			break;

		case "!":
			newValue = objectFactory.createPrimitive(!(value.isPrimitive ? value.toBoolean() : true));
			break;

		case "~":
			newValue = objectFactory.createPrimitive(~(utils.toPrimitive(context, value)));
			break;

		case "delete":
			if (result && result.name) {
				newValue = objectFactory.createPrimitive((result.object || context.scope).deleteProperty(result.name));
			} else {
				var deleted = false;
				if (result && result.result instanceof Scope) {
					// todo: this is hacky - deleting scope fails but returns true
					// this is here to account for that case
					deleted = true;
				}

				newValue = objectFactory.createPrimitive(deleted);
			}

			break;

		case "void":
			newValue = objectFactory.createPrimitive(undefined);
			break;

		default:
			throw new TypeError("Unknown unary operator: " + context.node.operator);
	}

	return context.result(newValue);
};
