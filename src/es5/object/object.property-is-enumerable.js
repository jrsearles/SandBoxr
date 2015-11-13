import {assertIsNotNullOrUndefined} from "../../utils/contracts";
import {toPropertyKey} from "../../utils/native";

export default function ($target, env, factory) {
	$target.define("propertyIsEnumerable", factory.createBuiltInFunction(function* (key) {
		assertIsNotNullOrUndefined(this.node, "Object.propertyIsEnumerable");

		let k = yield toPropertyKey(key);
		let descriptor = this.node.getOwnProperty(k);
		return factory.createPrimitive(!!(descriptor && descriptor.enumerable));
	}, 1, "Object.propertyIsEnumerable"));
}
