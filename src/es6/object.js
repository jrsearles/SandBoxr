import {assertIsNotNullOrUndefined} from "../utils/contracts";

import $is from "./object.is";
import $assign from "./object.assign";
import $getOwnPropertySymbols from "./object.get-own-property-symbols";
import $setPrototypeOf from "./object.set-prototype-of";
import $toString from "./object.to-string";

export default function (globalObject, env, factory) {
	let objectClass = globalObject.getValue("Object");
	let proto = objectClass.getValue("prototype");

	objectClass.define("getOwnPropertyNames", factory.createBuiltInFunction(function (obj) {
		assertIsNotNullOrUndefined(obj, "Object.getOwnPropertyNames");

		let keys = [];
		obj.getOwnPropertyKeys("String").forEach(key => {
			if (typeof key === "string") {
				keys.push(factory.createPrimitive(key));
			}
		});

		return factory.createArray(keys);
	}, 1, "Object.getOwnPropertyNames"));

	objectClass.define("keys", factory.createBuiltInFunction(function (obj) {
		assertIsNotNullOrUndefined(obj, "Object.keys");

		let keys = [];
		obj.getOwnPropertyKeys("String").forEach(key => {
			if (typeof key === "string") {
				let propInfo = obj.getProperty(key);
				if (propInfo && propInfo.enumerable) {
					keys.push(factory.createPrimitive(key));
				}
			}
		});

		return factory.createArray(keys);
	}, 1, "Object.keys"));

	$assign(objectClass, env, factory);
	$is(objectClass, env, factory);
	$getOwnPropertySymbols(objectClass, env, factory);
	$setPrototypeOf(objectClass, env, factory);
	$toString(proto, env, factory);
}
