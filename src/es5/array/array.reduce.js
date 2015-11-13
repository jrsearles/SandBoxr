import {toLength, toObject} from "../../utils/native";
import {assertIsFunction, assertIsNotNullOrUndefined} from "../../utils/contracts";
import iterate from "../../iterators/";
import {executeAccumulator} from "./array-helpers";

export default function ($target, env, factory) {
	$target.define("reduce", factory.createBuiltInFunction(function* (callback, initialValue) {
		assertIsNotNullOrUndefined(this.node, "Array.prototype.reduce");
		let arr = toObject(env, this.node);
		let length = yield toLength(arr);
		assertIsFunction(callback, arr);

		let hasInitialValue = false;
		let value;

		if (arguments.length > 1) {
			value = initialValue;
			hasInitialValue = true;
		}

		let hasElements = false;
		if (length > 0) {
			for (let entry of iterate.forward(arr, 0, length)) {
				if (!hasElements) {
					hasElements = true;

					if (!hasInitialValue) {
						value = entry.value;
						continue;
					}
				}

				value = yield executeAccumulator(env, callback, value, entry, arr);
			}
		}

		if (!hasElements && !hasInitialValue) {
			throw TypeError("Reduce of empty array with no initial value");
		}

		return value;
	}, 1, "Array.prototype.reduce"));
}