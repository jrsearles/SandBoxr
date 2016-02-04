import {Reference} from "../env/reference";
import {PropertyReference} from "../env/property-reference";
import {toNumber, toBoolean, toInt32} from "../utils/native";

export default function* UnaryExpression (node, context, next) {
	const objectFactory = context.env.objectFactory;
	let result = (yield next(node.argument, context)).result;
	let value, newValue;

	switch (node.operator) {
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
			newValue = objectFactory.createPrimitive(-(yield toNumber(value)));
			break;

		case "+":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(+(yield toNumber(value)));
			break;

		case "!":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(!(toBoolean(value)));
			break;

		case "~":
			value = result.getValue();
			newValue = objectFactory.createPrimitive(~(yield toInt32(value)));
			break;

		case "delete":
			let deleted = true;
			if (result && result instanceof Reference) {
				let resolved = !result.isUnresolved();

				if (context.env.isStrict()) {
					if (!resolved || !(result instanceof PropertyReference) || result.unqualified) {
						throw SyntaxError("Delete of an unqualified identifier in strict mode.");
					}
				}

				if (resolved) {
					deleted = result.delete();
				}
			} else if (node.argument.object) {
				throw ReferenceError(`${node.argument.object.name} is not defined`);
			}

			newValue = objectFactory.createPrimitive(deleted);
			break;

		case "void":
      result.getValue();
      
			newValue = objectFactory.createPrimitive(undefined);
			break;

		default:
			throw SyntaxError(`Unknown unary operator: ${node.operator}`);
	}

	return context.result(newValue);
}
