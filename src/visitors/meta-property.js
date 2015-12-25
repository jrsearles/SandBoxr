export default function MetaProperty (node, context) {
	if (node.meta.name === "new" && node.property.name === "target" && context.isNew) {
		return context.result(context.callee);
	}
	
	return context.empty();
}
