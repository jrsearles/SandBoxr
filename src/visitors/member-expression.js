import {PropertyReference} from "../env/property-reference";
import {toString} from "../utils/native";

export default function* MemberExpression (node, context, next) {
	let obj = (yield next(node.object, context)).result.getValue();
	let key, value;

	if (node.computed) {
		let id = (yield next(node.property, context)).result.getValue();
	
		if (id.isSymbol) {
			// if the identifier is a symbol, keep as is - property reference will handle it accordingly
			key = id;
		} else {
			key = yield toString(id);
		}
	} else {
		key = node.property.name;
	}

	value = new PropertyReference(key, obj, context.env);
	return context.result(value);
}
