import {isUndefined} from "../utils/contracts";
import {toInteger, toObject, toLength} from "../utils/native";
import {normalizeIndex} from "./array-helpers";

export default function ($target, env, factory) {
	$target.define("copyWithin", factory.createBuiltInFunction(function* (target, start, end) {
		let arr = toObject(env, this.object);
		let length = yield toLength(arr);
		let to = normalizeIndex(yield toInteger(target), length);
		let from = normalizeIndex(yield toInteger(start), length);
		let final = isUndefined(end) ? length : normalizeIndex(yield toInteger(end), length);

		let count = Math.min(final - from, length - to);
		let dir = 1;

		if (from < to && to < from + count) {
			dir = -1;
			from = from + count - 1;
			to = to + count - 1;
		}

		while (count > 0) {
			if (arr.has(from)) {
				arr.setValue(to, arr.getValue(from));
			} else {
				arr.deleteProperty(to, true);
			}

			from += dir;
			to += dir;
			count--;
		}

		return arr;
	}, 2, "Array.prototype.copyWithin"));
}
