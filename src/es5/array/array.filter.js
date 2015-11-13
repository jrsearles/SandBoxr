import {toLength, toObject, toBoolean} from "../../utils/native";
import {assertIsFunction, assertIsNotNullOrUndefined} from "../../utils/contracts";
import iterate from "../../iterators/";
import {executeCallback} from "./array-helpers";

export default function ($target, env, factory) {
	$target.define("filter", factory.createBuiltInFunction(function* (callback, thisArg) {
		assertIsNotNullOrUndefined(this.node, "Array.prototype.filter");

		let arr = toObject(env, this.node);
		let length = yield toLength(arr);
		assertIsFunction(callback, arr);

		let newArray = factory.createArray();
		let index = 0;

		for (let entry of iterate.forward(arr, 0, length)) {
			let passed = toBoolean(yield executeCallback(env, callback, entry, thisArg, arr));
			if (passed) {
				newArray.setIndex(index++, entry.value);
			}
		}

		return newArray;
	}, 1, "Array.prototype.filter"));
}
