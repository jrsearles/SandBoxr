export default function Literal (context) {
	return context.result(context.env.objectFactory.createPrimitive(context.node.value));
}
