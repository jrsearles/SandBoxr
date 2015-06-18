module.exports = function FunctionDeclaration (context) {
	return context.result(context.scope.getValue(context.node.id.name));
};
