export default function Identifier (node, context) {
	let name = node.name;

	if (context.callee && context.callee.identifier === name) {
		return context.result(context.callee);
	}

	return context.result(context.env.getReference(node.name));
}
