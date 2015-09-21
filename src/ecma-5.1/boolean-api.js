import * as contracts from "../utils/contracts";
import {toBoolean,primitiveToObject} from "../utils/native";

export default function booleanApi (env) {
	const globalObject = env.global;
	const objectFactory = env.objectFactory;

	let booleanClass = objectFactory.createFunction(function (obj) {
		let booleanValue = toBoolean(obj);

		// called as new
		if (this.isNew) {
			return primitiveToObject(env, booleanValue);
		}

		return objectFactory.create("Boolean", booleanValue);
	}, null, { configurable: false, enumerable: false, writable: false });

	let proto = booleanClass.getValue("prototype");
	proto.className = "Boolean";
	proto.value = false;

	proto.define("toString", objectFactory.createBuiltInFunction(function () {
		contracts.assertIsNotGeneric(this.node, "Boolean", "Boolean.prototype.toString");
		return objectFactory.createPrimitive(String(this.node.value));
	}, 0, "Boolean.prototype.toString"));

	proto.define("valueOf", objectFactory.createBuiltInFunction(function () {
		contracts.assertIsNotGeneric(this.node, "Boolean", "Boolean.prototype.valueOf");
		return objectFactory.createPrimitive(this.node.value);
	}, 0, "Boolean.prototype.valueOf"));

	globalObject.define("Boolean", booleanClass);
}
