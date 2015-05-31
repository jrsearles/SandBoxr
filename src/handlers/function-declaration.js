var objectFactory = require("../types/object-factory");

module.exports = function FunctionDeclaration (context) {
	// var id = context.node.id.name;
	// var fn = objectFactory.createFunction(context.node, context.scope);

	// context.scope.setProperty(id, fn);
	// return context.result(fn);
	return context.result(context.scope.getProperty(context.node.id.name));
};
