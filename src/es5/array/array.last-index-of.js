import {UNDEFINED} from "../../types/primitive-type";
import {toLength, toInteger} from "../../utils/native";
import iterate from "../../iterators";

export default function ($target, env, factory) {
	$target.define("lastIndexOf", factory.createBuiltInFunction(function* (searchElement, fromIndex) {
		searchElement = searchElement || UNDEFINED;
		let length = yield toLength(this.object);
		let index = arguments.length === 1 ? length - 1 : (yield toInteger(fromIndex));

		if (index < 0) {
			index = length - Math.abs(index);
		}

		for (let {key, value} of iterate.reverse(this.object, index)) {
			if (env.ops.strictEquals(searchElement, value || UNDEFINED)) {
				return factory.createPrimitive(key);
			}
		}

		return factory.createPrimitive(-1);
	}, 1, "Array.prototype.lastIndexOf"));
}