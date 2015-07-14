module.exports = function ThrowStatement (context) {
	// todo: handle more specific errors
	var arg = context.create(context.node.argument).execute().result.getValue();

	if (arg.isPrimitive) {
		throw arg.value;
	}

	var err = new Error();
	err.wrappedError = arg;
	throw err;
};
