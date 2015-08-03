export default function ReturnStatement (context) {
	if (context.node.argument) {
		return context.exit(context.create(context.node.argument).execute().result.getValue());
	}

	return context.exit(context.env.global.getProperty("undefined").getValue());
}
