import {toLength} from "../../utils/native";

export default function ($target, env, factory) {
	$target.define("unshift", factory.createBuiltInFunction(function* (...items) {
		let length = yield toLength(this.node);
		let argCount = items.length;
		let i = length;
		let toIndex, fromIndex;

		while (i > 0) {
			fromIndex = i - 1;
			toIndex = i + argCount - 1;

			if (this.node.has(fromIndex)) {
				this.node.setValue(toIndex, this.node.getValue(fromIndex));
			} else {
				this.node.deleteProperty(toIndex, true);
			}

			i--;
		}

		for (i = 0; i < argCount; i++) {
			this.node.setValue(i, items[i]);
		}

		let newLength = factory.createPrimitive(argCount + length);
		this.node.setValue("length", newLength);
		return newLength;
	}, 1, "Array.prototype.unshift"));
}