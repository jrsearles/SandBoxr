import {confirmObject} from "./object-helpers";

export default function ($target, env, factory) {
	$target.define("isExtensible", factory.createBuiltInFunction(function (obj) {
		if (!confirmObject(obj, "Object.isExtensible")) {
			return factory.createPrimitive(false);
		}

		return factory.createPrimitive(obj.isExtensible());
	}, 1, "Object.isExtensible"));
}
