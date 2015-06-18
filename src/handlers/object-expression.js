var objectFactory = require("../types/object-factory");
var utils = require("../utils");

function setDescriptor (context, obj, name, descriptor) {
	if (descriptor.get) {
		descriptor.getter = function () {
			return utils.executeFunction(context, descriptor.get, descriptor.get.node.params, [], this, descriptor.get.node);
		};
	}

	if (descriptor.set) {
		descriptor.setter = function () {
			return utils.executeFunction(context, descriptor.set, descriptor.set.node.params, arguments, this, descriptor.set.node);
		};
	}

	obj.defineOwnProperty(name, null, descriptor);
}

module.exports = function ObjectExpression (context) {
	var obj = objectFactory.createObject();
	var descriptors = Object.create(null);

	context.node.properties.forEach(function (property) {
		var value = context.create(property.value).execute().result;
		var name = property.key.name || property.key.value;

		switch (property.kind) {
			case "get":
			case "set":
				descriptors[name] = descriptors[name] || Object.create(null);
				descriptors[name][property.kind] = value;
				break;

			default:
				obj.defineOwnProperty(name, value);
				break;
		}
	});

	for (var prop in descriptors) {
		setDescriptor(context, obj, prop, descriptors[prop]);
	}

	return context.result(obj);
};
