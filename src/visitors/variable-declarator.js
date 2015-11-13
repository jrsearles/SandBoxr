export default function* VariableDeclarator (context) {
	let name = context.node.id.name;
	let value;

	if (context.node.init) {
		value = (yield context.create(context.node.init).execute()).result;
	}

	// variables have already been hoisted so we just need to initialize them if defined
	if (value) {
		context.env.setValue(name, value.getValue());
	}

	return context.result(context.env.getReference(name));
}
