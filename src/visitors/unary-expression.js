import Reference from "../env/reference";
import PropertyReference from "../env/property-reference";
import * as convert from "../utils/convert";
import {degenerate} from "../utils/async";

export default degenerate(function* UnaryExpression (context) {
	var result = (yield context.create(context.node.argument).execute()).result;
	var objectFactory = context.env.objectFactory;
	var value, newValue;

	switch (context.node.operator) {
		case "typeof":
			let type;
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
			newValue = objectFactory.createPrimitive(!(convert.toBoolean(value)));
			break;

		case "~":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(~(convert.toInt32(context.env, value)));
			break;

		case "delete":
			let deleted = true;
			if (result && result instanceof Reference) {
				let resolved = !result.isUnresolved();
				
				if (context.env.isStrict()) {
					if (!resolved || !(result instanceof PropertyReference) || result.unqualified) {
						throw new SyntaxError("Delete of an unqualified identifier in strict mode.");	
					}
				}
				
				if (resolved) {
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
});
