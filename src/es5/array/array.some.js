import {toLength, toObject, toBoolean} from "../../utils/native";
import {assertIsFunction, assertIsNotNullOrUndefined} from "../../utils/contracts";
import iterate from "../../iterators/";
import {executeCallback} from "./array-helpers";

export default function ($target, env, factory) {
	$target.define("some", factory.createBuiltInFunction(function* (callback, thisArg) {
		assertIsNotNullOrUndefined(this.object, "Array.prototype.some");
		let arr = toObject(this.object);
		let length = yield toLength(this.object);
		assertIsFunction(callback, this.object);

		for (let entry of iterate.forward(arr, 0, length)) {
			let passed = toBoolean(yield executeCallback(env, callback, entry, thisArg, arr));
			if (passed) {
				return factory.createPrimitive(true);
			}
		}

		return factory.createPrimitive(false);
	}, 1, "Array.prototype.some"));
}