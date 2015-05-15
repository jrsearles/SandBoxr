module.exports = function VariableDeclaration (context) {
	var value;

	context.node.declarations.forEach(function (decl) {
		value = context.create(decl).execute();
	});

	return value;
};
