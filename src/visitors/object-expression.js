import {assertAreValidArguments, assertAreValidSetterArguments} from "../utils/contracts";
import {each} from "../utils/async";
import {toPropertyKey} from "../utils/native";

function setDescriptor (env, obj, descriptor) {
	let strict = env.isStrict();

	if (descriptor.get) {
		assertAreValidArguments(descriptor.get.node.params, strict);
		descriptor.getter = function* () {
			return yield descriptor.get.call(this);
		};
	}

	if (descriptor.set) {
		assertAreValidSetterArguments(descriptor.set.node.params, strict);
		descriptor.setter = function* (value) {
			yield descriptor.set.call(this, [value]);
		};
	}

	obj.defineOwnProperty(descriptor.key, descriptor);
}

function createDescriptor (key, value) {
	return {key: key, value: value, configurable: true, enumerable: true, writable: true};
}

export default function* ObjectExpression (node, context, next) {
	let obj = context.env.objectFactory.createObject();
	let descriptors = Object.create(null);

	yield* each(node.properties, function* (property) {
		let value = (yield next(property.value, context)).result.getValue();
		let key;

		if (property.computed) {
			let keyValue = (yield next(property.key, context)).result.getValue();
			key = yield toPropertyKey(keyValue);
		} else {
			key = property.key.name || property.key.value;
		}

		switch (property.kind) {
			case "get":
			case "set":
				descriptors[key] = descriptors[key] || createDescriptor(key);
				descriptors[key][property.kind] = value;
				break;

			default:
				obj.defineOwnProperty(key, createDescriptor(key, value));
				break;
		}
	});

	for (let prop in descriptors) {
		setDescriptor(context.env, obj, descriptors[prop]);
	}

	return context.result(obj);
}
