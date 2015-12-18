export default function FunctionDeclaration (node, context) {
	return context.result(context.env.getValue(node.id.name));
}
