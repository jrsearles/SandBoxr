// var typeRegistry = require("../types/type-registry");

module.exports = function VariableDeclarator (context) {
	var id = context.node.id.name;
	var value;

	if (context.node.init) {
		value = context.create(context.node.init).execute().result;
	}

	value = value || context.scope.global.getProperty("undefined");
	context.scope.setProperty(id, value);

	return context.result(value, id);
};
