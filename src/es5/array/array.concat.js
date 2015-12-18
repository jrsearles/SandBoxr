import {toObject, toLength} from "../../utils/native";
import {isSpreadable} from "./array-helpers";

export default function ($target, env, factory) {
	$target.define("concat", factory.createBuiltInFunction(function* (...arrays) {
		let newArray = factory.createArray();

		// add "this" array to bunch
		arrays.unshift(toObject(env, this.object));

		let index = 0;
		while (arrays.length > 0) {
			let current = arrays.shift();

			if (isSpreadable(current)) {
				let length = yield toLength(current);
				for (let i = 0; i < length; i++) {
					if (current.has(i)) {
						newArray.setIndex(index, current.getValue(i));
					}

					index++;
				}
			} else {
				newArray.setIndex(index++, current);
			}
		}

		newArray.setValue("length", factory.createPrimitive(index));
		return newArray;
	}, 1, "Array.prototype.concat"));
}