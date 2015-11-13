import {confirmObject} from "./object-helpers";

export default function ($target, env, factory) {
	$target.define("seal", factory.createBuiltInFunction(function (obj) {
		if (confirmObject(obj, "Object.seal")) {
			obj.seal();
		}

		return obj;
	}, 1, "Object.seal"));
}
