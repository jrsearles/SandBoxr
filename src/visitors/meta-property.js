export default function MetaProperty (node, context) {
	if (node.meta.name === "new" && node.property.name === "target" && context.newTarget) {
		return context.result(context.newTarget);
	}
	
	return context.empty();
}
