export default function* ThrowStatement (node, context, next) {
	let arg = (yield next(node.argument, context)).result.getValue();
	return context.raise(arg);
}
