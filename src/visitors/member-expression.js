import PropertyReference from "../env/property-reference";
import * as convert from "../utils/convert";

export default function MemberExpression (context) {
	var obj = context.create(context.node.object).execute().result.getValue();
	var name, value;

	if (context.node.computed) {
		name = convert.toString(context.env, context.create(context.node.property).execute().result.getValue());
	} else {
		name = context.node.property.name;
	}

	value = new PropertyReference(name, obj, false, context.env);
	return context.result(value);
}
