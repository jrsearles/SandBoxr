import {toLength} from "../../utils/native";
import {UNDEFINED} from "../../types/primitive-type";

export default function ($target, env, factory) {
	$target.define("pop", factory.createBuiltInFunction(function* () {
		let obj;
		let i = yield toLength(this.node);

		if (i > 0) {
			i--;

			if (this.node.has(i)) {
				obj = this.node.getValue(i);
				this.node.deleteProperty(i, true);
			}
		}

		this.node.setValue("length", factory.createPrimitive(i));
		return obj || UNDEFINED;
	}, 0, "Array.prototype.pop"));
}
