export default function* ThrowStatement (context) {
	let arg = (yield context.create(context.node.argument).execute()).result.getValue();
	return context.raise(arg);
}
