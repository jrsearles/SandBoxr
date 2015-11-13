import {confirmObject} from "./object-helpers";

export default function ($target, env, factory) {
	$target.define("freeze", factory.createBuiltInFunction(function (obj) {
		if (confirmObject(obj, "Object.freeze")) {
			obj.freeze();
		}

		return obj;
	}, 1, "Object.freeze"));
}
