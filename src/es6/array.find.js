import {toObject, toLength, toBoolean} from "../utils/native";
import {assertIsFunction} from "../utils/contracts";
import {UNDEFINED} from "../types/primitive-type";
import {executeCallback} from "./array-helpers";

export default function ($target, env, factory) {
	$target.define("find", factory.createBuiltInFunction(function* (predicate, thisArg) {
		let arr = toObject(this.object);
		let length = yield toLength(arr);

		assertIsFunction(predicate, "predicate");

		// for some reason the spec for the find methods calls empty array slots
		// how that is useful, beats me
		let i = 0;
		while (i < length) {
			let propInfo = arr.getProperty(i);
			let value = propInfo ? propInfo.getValue() : UNDEFINED;
			let passed = toBoolean(yield executeCallback(env, predicate, {key: i, value}, thisArg, arr));
			if (passed) {
				return value;
			}

			i++;
		}

		return UNDEFINED;
	}, 1, "Array.prototype.find"));
}
