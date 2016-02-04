import {assertAreValidArguments, assertAreValidSetterArguments} from "../utils/contracts";
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

	obj.defineProperty(descriptor.key, descriptor);
}

function findOrCreateDescriptor (arr, key) {
	let i = arr.length;
	while (i--) {
		if (arr[i] === key) {
			return arr[i];
		}
	}
	
	let descriptor = {configurable: true, enumerable: true, key};
	arr.push(descriptor);
	return descriptor;
}

export default function* ObjectExpression (node, context, next) {
	let obj = context.env.objectFactory.createObject();
	let descriptors = [];
  
  for (let i = 0, ln = node.properties.length; i < ln; i++) {
    let property = node.properties[i];
		let value = (yield next(property.value, context)).result.getValue();
		let key;

		if (property.computed) {
			let keyValue = (yield next(property.key, context)).result.getValue();
			key = yield toPropertyKey(keyValue);
		} else {
			key = property.key.name || property.key.value;
		}

		let descriptor = findOrCreateDescriptor(descriptors, key);
		switch (property.kind) {
			case "get":
			case "set":
				descriptor[property.kind] = value;
				break;

			default:
				descriptor.value = value;
				descriptor.writable = true;
				break;
		}
  }

	// yield* each(node.properties, function* (property) {
	// 	let value = (yield next(property.value, context)).result.getValue();
	// 	let key;

	// 	if (property.computed) {
	// 		let keyValue = (yield next(property.key, context)).result.getValue();
	// 		key = yield toPropertyKey(keyValue);
	// 	} else {
	// 		key = property.key.name || property.key.value;
	// 	}

	// 	let descriptor = findOrCreateDescriptor(descriptors, key);
	// 	switch (property.kind) {
	// 		case "get":
	// 		case "set":
	// 			descriptor[property.kind] = value;
	// 			break;

	// 		default:
	// 			descriptor.value = value;
	// 			descriptor.writable = true;
	// 			break;
	// 	}
	// });

	descriptors.forEach(desc => setDescriptor(context.env, obj, desc));
	// for (let prop in descriptors) {
	// 	setDescriptor(context.env, obj, descriptors[prop]);
	// }

	return context.result(obj);
}
