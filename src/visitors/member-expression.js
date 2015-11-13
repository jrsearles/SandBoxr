import {PropertyReference} from "../env/property-reference";
import {toString} from "../utils/native";

export default function* MemberExpression (context) {
	let obj = (yield context.create(context.node.object).execute()).result.getValue();
	let key, value;

	if (context.node.computed) {
		let id = (yield context.create(context.node.property).execute()).result.getValue();
		if (id.isSymbol) {
			// if the identifier is a symbol, keep as is - property reference will handle it accordingly
			key = id;
		} else {
			key = yield toString(id);
		}
	} else {
		key = context.node.property.name;
	}

	value = new PropertyReference(key, obj, context.env);
	return context.result(value);
}
