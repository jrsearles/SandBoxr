export default function* SpreadElement (node, context, next) {
	let args = yield next(node.argument, context);
	return context.result(args.result);
}
