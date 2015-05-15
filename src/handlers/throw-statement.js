module.exports = function ThrowStatement (context) {
	// todo: handle more specific errors
	var arg = context.create(context.node.argument).execute().result;
	throw new Error(arg.getProperty("message"));
};
