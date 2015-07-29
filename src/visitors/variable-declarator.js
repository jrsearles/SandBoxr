module.exports = function VariableDeclarator (context) {
	var name = context.node.id.name;
	var value;

	if (context.node.init) {
		value = context.create(context.node.init).execute().result;
	}

	// variables have already been hoisted so we just need to initialize them if defined
	if (value) {
		context.env.putValue(name, value.getValue(), false, context);
	}

	return context.result(context.env.getReference(name));
};
