function getName (node) {
	if (node.name) {
		return node.name;
	}
	
	if (node.id) {
		return node.id.name;
	}
	
	let parent = node.getParent();
	if (parent.isVariableDeclarator()) {
		return getName(parent);
	}
	
	if (parent.isProperty()) {
		if (parent.kind === "get" || parent.kind === "set") {
			return `${parent.kind} ${getName(parent.key)}`;
		}
		
		return getName(parent.key);
	}
	
	return "";
}

export default function FunctionExpression (node, context) {
	let objectFactory = context.env.objectFactory;
	let strict = context.env.isStrict() || node.body.isStrict();
	let func = objectFactory.createFunction(node, undefined, {strict, name: getName(node)});
	
	func.bindScope(context.env.current);
	
	return context.result(func);
}
