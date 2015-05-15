var objectFactory = require("../types/object-factory");

module.exports = function ObjectExpression (context) {
	var obj = objectFactory.createObject();

	context.node.properties.forEach(function (prop) {
		var value = context.create(prop.value).execute().result;
		obj.setProperty(prop.key.name || prop.key.value, value);
	});

	return context.result(obj);
};
