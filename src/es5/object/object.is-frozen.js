import {confirmObject} from "./object-helpers";

export default function ($target, env, factory) {
	$target.define("isFrozen", factory.createBuiltInFunction(function (obj) {
		if (!confirmObject(obj, "Object.isFrozen")) {
			return factory.createPrimitive(true);
		}

		if (obj.isPrimitive) {
			return factory.createPrimitive(true);
		}

		if (!obj.extensible) {
			for (let prop in obj.properties) {
				if (obj.properties[prop].writable || obj.properties[prop].configurable) {
					return factory.createPrimitive(false);
				}
			}
		}

		return factory.createPrimitive(!obj.extensible);
	}, 1, "Object.isFrozen"));
}
