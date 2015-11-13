import {assertIsNotNullOrUndefined} from "../../utils/contracts";
import {toPropertyKey} from "../../utils/native";

export default function ($target, env, factory) {
	$target.define("hasOwnProperty", factory.createBuiltInFunction(function* (key) {
		assertIsNotNullOrUndefined(this.node, "Object.prototype.hasOwnProperty");
		let k = yield toPropertyKey(key);
		return factory.createPrimitive(this.node.owns(k));
	}, 1, "Object.prototype.hasOwnProperty"));
}
