import {assertIsNotGeneric} from "../../utils/contracts";
import {toPrimitive} from "../../utils/native";

export default function ($target, env, factory) {
	$target.define("toString", factory.createBuiltInFunction(function* (radix) {
		assertIsNotGeneric(this.node, "Number", "Number.prototype.toString");

		let radixValue = 10;
		if (radix) {
			radixValue = yield toPrimitive(radix, "number");
			if (radixValue < 2 || radixValue > 36) {
				throw RangeError("toString() radix argument must be between 2 and 36");
			}
		}

		return factory.createPrimitive(this.node.value == null ? "0" : this.node.value.toString(radixValue));
	}, 1, "Number.prototype.toString"));
}
