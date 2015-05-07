module.exports = function (context) {
	var name = context.node.name;
	var value = context.scope.getProperty(name);
	return context.result(value, name);
};
