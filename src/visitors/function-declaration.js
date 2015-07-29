module.exports = function FunctionDeclaration (context) {
	return context.result(context.env.getValue(context.node.id.name));
};
