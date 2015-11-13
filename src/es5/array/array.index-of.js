import {UNDEFINED} from "../../types/primitive-type";
import {toLength, toInteger} from "../../utils/native";
import iterate from "../../iterators";
import {getStartIndex} from "./array-helpers";

export default function ($target, env, factory) {
	$target.define("indexOf", factory.createBuiltInFunction(function* (searchElement, fromIndex) {
		searchElement = searchElement || UNDEFINED;
		let length = yield toLength(this.node);
		let index = arguments.length === 1 ? 0 : (yield toInteger(fromIndex));
		const notFound = factory.createPrimitive(-1);

		if (length === 0 || index >= length) {
			return notFound;
		}

		index = getStartIndex(index, length);

		for (let {key, value} of iterate.forward(this.node, index, length)) {
			if (env.ops.strictEquals(searchElement, value || UNDEFINED)) {
				return factory.createPrimitive(key);
			}
		}

		return notFound;
	}, 1, "Array.prototype.indexOf"));
}