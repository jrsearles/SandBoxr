import {toLength, toInteger} from "../../utils/native";
import {getStartIndex, getEndIndex} from "./array-helpers";
import iterate from "../../iterators/";

export default function ($target, env, factory) {
	$target.define("slice", factory.createBuiltInFunction(function* (begin, end) {
		let source = this.object;
		let length = yield toLength(this.object);
		begin = begin ? (yield toInteger(begin)) : 0;

		if (!end || end.type === "undefined") {
			end = length;
		} else {
			end = yield toInteger(end);
		}

		begin = getStartIndex(begin, length);
		end = getEndIndex(end, length);

		let arr = factory.createArray();
		let newLength = 0;

		for (let {key, value} of iterate.forward(source, begin, end)) {
			let index = key - begin;
			arr.setIndex(index, value);
			newLength = ++index;
		}

		arr.setValue("length", factory.createPrimitive(newLength));
		return arr;
	}, 2, "Array.prototype.slice"));
}