import {confirmObject} from "./object-helpers";

export default function ($target, env, factory) {
	$target.define("preventExtensions", factory.createBuiltInFunction(function (obj) {
		if (confirmObject(obj, "Object.preventExtensions")) {
			obj.preventExtensions();
		}

		return obj;
	}, 1, "Object.preventExtensions"));
}
