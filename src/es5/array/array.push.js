import {toLength} from "../../utils/native";

export default function ($target, env, factory) {
	$target.define("push", factory.createBuiltInFunction(function* (...items) {
		let start = yield toLength(this.object);
		let count = items.length;
		let length = start + count;
		
		if (length > Number.MAX_SAFE_INTEGER) {
			throw TypeError("The push operation will cause an invalid length value.");
		}

		for (let i = 0; i < count; i++) {
			this.object.setValue(start + i, items[i]);
		}

		let newLength = factory.createPrimitive(length);
		this.object.setValue("length", newLength);
		return newLength;
	}, 1, "Array.prototype.push"));
}