import {assertIsObject, assertArgIsNotNullOrUndefined} from "../../utils/contracts";
import {defineProperty} from "./object-helpers";

export default function ($target, env, factory) {
	$target.define("defineProperties", factory.createBuiltInFunction(function* (obj, descriptors) {
		assertIsObject(obj, "Object.defineProperties");
		assertArgIsNotNullOrUndefined(descriptors);

		for (let prop in descriptors.properties) {
			if (descriptors.properties[prop].enumerable) {
				yield defineProperty(env, obj, prop, descriptors.getValue(prop));
			}
		}

		return obj;
	}, 2, "Object.defineProperties"));
}
