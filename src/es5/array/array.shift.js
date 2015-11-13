import {toLength} from "../../utils/native";
import {UNDEFINED} from "../../types/primitive-type";

export default function ($target, env, factory) {
	$target.define("shift", factory.createBuiltInFunction(function* () {
		let obj;
		let length = yield toLength(this.node);
		let i = 0;

		if (length > 0) {
			if (this.node.has(i)) {
				obj = this.node.getValue(i);
				this.node.deleteProperty(i);
			}

			while (++i < length) {
				if (this.node.has(i)) {
					this.node.setValue(i - 1, this.node.getValue(i));
				} else {
					this.node.deleteProperty(i);
				}
			}

			this.node.deleteProperty(length - 1);
		}

		this.node.setValue("length", factory.createPrimitive(length === 0 ? 0 : --length));
		return obj || UNDEFINED;
	}, 0, "Array.prototype.shift"));
}
