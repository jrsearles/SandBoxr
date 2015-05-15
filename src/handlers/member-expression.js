var typeRegistry = require("../types/type-registry");

module.exports = function MemberExpression (context) {
	var obj = context.create(context.node.object).execute().result;
	var name, value;

	if (context.node.computed) {
		name = context.create(context.node.property).execute().result.value;
		value = obj.getProperty(name);
	} else {
		name = context.node.property.name;
		value = context.create(context.node.property, context.node, obj).execute().result;
	}

	return context.result(value || typeRegistry.get("undefined"), name, obj);
};
