export default function* VariableDeclaration (context) {
	for (let decl of context.node.declarations) {
		yield context.create(decl).execute();
	}

	return context.empty();
}
