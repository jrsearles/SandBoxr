module.exports = function Identifier (context) {
	var name = context.node.name;
	var value = context.scope.getProperty(name);

	if (value === undefined) {
		throw new ReferenceError(name + " is not defined.");
	}

	return context.result(value, name);
};
