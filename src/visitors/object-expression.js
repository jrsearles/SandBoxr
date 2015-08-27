import * as func from "../utils/func";
import * as contracts from "../utils/contracts";
import {degenerate} from "../utils/async";

function setDescriptor (env, obj, name, descriptor) {
	var strict = env.isStrict();
	
	if (descriptor.get) {
		descriptor.get.node.params.forEach(param => contracts.assertIsValidParameterName(param.name, strict));
		descriptor.getter = degenerate(function* () {
			return yield func.executeFunction(env, descriptor.get, descriptor.get.node.params, [], this, descriptor.get.node);
		});
	}
	
	if (descriptor.set) {
		descriptor.set.node.params.forEach(param => contracts.assertIsValidParameterName(param.name, strict));
		descriptor.setter = degenerate(function* () {
			yield func.executeFunction(env, descriptor.set, descriptor.set.node.params, arguments, this, descriptor.set.node);
		});
	}
	
	obj.defineOwnProperty(name, descriptor);
}

function createDescriptor (value) {
	return { value: value, configurable: true, enumerable: true, writable: true };
}

export default degenerate(function* ObjectExpression (context) {
	var obj = context.env.objectFactory.createObject();
	var descriptors = Object.create(null);
	
	for (let property of context.node.properties) {
		var value = (yield context.create(property.value).execute()).result.getValue();
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
	}
	
	for (let prop in descriptors) {
		setDescriptor(context.env, obj, prop, descriptors[prop]);
	}

	return context.result(obj);
});
