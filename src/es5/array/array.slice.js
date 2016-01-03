import {toLength, toInteger} from "../../utils/native";
import {getStartIndex, getEndIndex} from "./array-helpers";
import iterate from "../../iterators/";
import {createDataProperty} from "../../utils/helpers";

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

		let newLength = Math.max(end - begin, 0);
		let arr = yield factory.createArrayFromSpecies(this.object, newLength);
		
		newLength = 0;
		for (let {key, value} of iterate.forward(source, begin, end)) {
			let index = key - begin;
			createDataProperty(arr, index, value);
			newLength = ++index;
		}

		arr.setValue("length", factory.createPrimitive(newLength));
		return arr;
	}, 2, "Array.prototype.slice"));
}