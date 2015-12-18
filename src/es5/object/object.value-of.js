import {toObject} from "../../utils/native";

export default function ($target, env, factory) {
	$target.define("valueOf", factory.createBuiltInFunction(function () {
		return toObject(env, this.object, true);
	}, 0, "Object.prototype.valueOf"));
}
