import {toLength} from "../../utils/native";
import {UNDEFINED} from "../../types/primitive-type";

export default function ($target, env, factory) {
	$target.define("shift", factory.createBuiltInFunction(function* () {
		let obj;
		let length = yield toLength(this.object);
		let i = 0;

		if (length > 0) {
			if (this.object.has(i)) {
				obj = this.object.getValue(i);
				this.object.deleteProperty(i);
			}

			while (++i < length) {
				if (this.object.has(i)) {
					this.object.setValue(i - 1, this.object.getValue(i));
				} else {
					this.object.deleteProperty(i);
				}
			}

			this.object.deleteProperty(length - 1);
		}

		this.object.setValue("length", factory.createPrimitive(length === 0 ? 0 : --length));
		return obj || UNDEFINED;
	}, 0, "Array.prototype.shift"));
}
