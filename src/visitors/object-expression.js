import * as func from "../utils/func";

function setDescriptor (env, obj, name, descriptor) {
	if (descriptor.get) {
		descriptor.getter = function () {
			return func.executeFunction(env, descriptor.get, descriptor.get.node.params, [], this, descriptor.get.node);
		};
	}

	if (descriptor.set) {
		descriptor.setter = function () {
			func.executeFunction(env, descriptor.set, descriptor.set.node.params, arguments, this, descriptor.set.node);
		};
	}

	obj.defineOwnProperty(name, descriptor);
}

function createDescriptor (value) {
	return { value: value, configurable: true, enumerable: true, writable: true };
}

export default function ObjectExpression (context) {
	var obj = context.env.objectFactory.createObject();
	var descriptors = Object.create(null);

	context.node.properties.forEach(function (property) {
		var value = context.create(property.value).execute().result.getValue();
		var name = property.key.name || property.key.value;

		switch (property.kind) {
			case "get":
			case "set":
				descriptors[name] = descriptors[name] || createDescriptor();
				descriptors[name][property.kind] = value;
				break;

			default:
				obj.defineOwnProperty(name, createDescriptor(value));
				break;
		}
	});

	for (let prop in descriptors) {
		setDescriptor(context.env, obj, prop, descriptors[prop]);
	}

	return context.result(obj);
}
