import {assertIsNotGeneric} from "../../utils/contracts";
import {toNumber} from "../../utils/native";

export default function ($target, env, factory) {
	$target.define("toFixed", factory.createBuiltInFunction(function* (fractionDigits) {
		assertIsNotGeneric(this.node, "Number", "Number.prototype.toFixed");

		let digits = 0;
		if (fractionDigits) {
			digits = yield toNumber(fractionDigits);
		}

		return factory.createPrimitive(Number.prototype.toFixed.call(this.node.value, digits));
	}, 1, "Number.prototype.toFixed"));
}
