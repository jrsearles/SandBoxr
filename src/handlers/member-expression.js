var convert = require("../utils/convert");
var PropertyReference = require("../env/property-reference");

module.exports = function MemberExpression (context) {
	var obj = context.create(context.node.object).execute().result.getValue();
	var name, value;

	if (context.node.computed) {
		name = convert.toString(context, context.create(context.node.property).execute().result.getValue());
	} else {
		name = context.node.property.name;
	}

	value = new PropertyReference(name, obj);
	return context.result(value);
};
