import {PropertyReference} from "../env/property-reference";
import {toString} from "../utils/native";

export default function* MemberExpression (context) {
	let obj = (yield context.create(context.node.object).execute()).result.getValue();
	let name, value;

	if (context.node.computed) {
		name = yield toString(context.env, (yield context.create(context.node.property).execute()).result.getValue());
	} else {
		name = context.node.property.name;
	}

	value = new PropertyReference(name, obj, context.env);
	return context.result(value);
}
