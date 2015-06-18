module.exports = function Identifier (context) {
	var name = context.node.name;
	var value = context.scope.getValue(name);

	if (value === undefined) {
		throw new ReferenceError(name + " is not defined.");
	}

	return context.reference(value, name);
};
