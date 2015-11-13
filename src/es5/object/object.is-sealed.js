import {confirmObject} from "./object-helpers";

export default function ($target, env, factory) {
	$target.define("isSealed", factory.createBuiltInFunction(function (obj) {
		if (!confirmObject(obj, "Object.isSealed")) {
			return factory.createPrimitive(true);
		}

		if (!obj.extensible) {
			for (let prop in obj.properties) {
				if (obj.properties[prop].configurable) {
					return factory.createPrimitive(false);
				}
			}
		}

		return factory.createPrimitive(!obj.extensible);
	}, 1, "Object.isSealed"));
}
