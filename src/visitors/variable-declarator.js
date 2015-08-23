import {degenerate} from "../utils/async";

export default degenerate(function* VariableDeclarator (context) {
	var name = context.node.id.name;
	var value;

	if (context.node.init) {
		value = (yield context.create(context.node.init).execute()).result;
	}

	// variables have already been hoisted so we just need to initialize them if defined
	if (value) {
		context.env.putValue(name, value.getValue(), context.env.isStrict(), context);
	}

	return context.result(context.env.getReference(name));
});
