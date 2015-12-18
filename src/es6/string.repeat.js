import {toInteger, toString} from "../utils/native";
import {assertIsNotNullOrUndefined} from "../utils/contracts";

export default function (target, env, factory) {
	target.define("repeat", factory.createBuiltInFunction(function* (count) {
		assertIsNotNullOrUndefined(this.object, "String.prototype.repeat");

		let stringValue = yield toString(this.object);
		let countValue = yield toInteger(count);
		if (countValue < 0 || !isFinite(countValue)) {
			throw RangeError("Invalid count value");
		}

		let returnValue = "";
		if (countValue > 0 && stringValue) {
			if (countValue === 1) {
				returnValue = stringValue;
			} else {
				while (countValue > 0) {
					returnValue += stringValue;
					countValue--;
				}
			}
		}

		return factory.createPrimitive(returnValue);
	}, 1, "String.prototype.repeat"));
}