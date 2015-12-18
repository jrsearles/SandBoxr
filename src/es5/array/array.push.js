import {toLength} from "../../utils/native";

export default function ($target, env, factory) {
	$target.define("push", factory.createBuiltInFunction(function* (...items) {
		let start = yield toLength(this.object);
		let i = 0;

		for (let length = items.length; i < length; i++) {
			this.object.setValue(start + i, items[i]);
		}

		let newLength = factory.createPrimitive(start + i);
		this.object.setValue("length", newLength);
		return newLength;
	}, 1, "Array.prototype.push"));
}