module.exports = function VariableDeclaration (context) {
	context.node.declarations.forEach(decl => context.create(decl).execute());
	return context.empty();
};
