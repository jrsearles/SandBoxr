var objectFactory = require("../types/object-factory");

module.exports = function (context) {
	var obj = objectFactory.createObject();

	context.node.properties.forEach(function (prop) {
		var value = context.create(prop.value).execute().result;
		obj.setProperty(prop.key.name, value);
	});

	return context.result(obj);
};
