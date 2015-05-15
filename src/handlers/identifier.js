module.exports = function Identifier (context) {
	var name = context.node.name;
	var value = context.scope.getProperty(name);
	return context.result(value, name);
};
