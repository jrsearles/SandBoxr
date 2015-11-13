import {assertIsObject} from "../utils/contracts";

export default function ($target, env, factory) {
	$target.define("isExtensible", factory.createBuiltInFunction(function (target) {
		assertIsObject(target, "Reflect.isExtensible");
		return factory.createPrimitive(target.isExtensible());
	}, 1, "Reflect.isExtensible"));
}
