export default function* VariableDeclarator (node, context, next) {
	let name = node.id.name;
	let value;

	if (node.init) {
		value = (yield next(node.init, context)).result;
	}

	// variables have already been hoisted so we just need to initialize them if defined
	if (value) {
		context.env.setValue(name, value.getValue());
	}

	return context.result(context.env.getReference(name));
}
