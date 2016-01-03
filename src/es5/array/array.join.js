import {toLength, toString} from "../../utils/native";
import {isNullOrUndefined} from "../../utils/checks";
import {UNDEFINED} from "../../types/primitive-type";

export default function ($target, env, factory) {
	$target.define("join", factory.createBuiltInFunction(function* join (separator) {
		let length = yield toLength(this.object);
		separator = arguments.length === 0 || separator === UNDEFINED ? "," : (yield toString(separator));
		let stringValues = [];
		let stringValue;

		for (let i = 0; i < length; i++) {
			stringValue = "";
			if (this.object.has(i)) {
				stringValue = this.object.getValue(i);
				if (isNullOrUndefined(stringValue)) {
					stringValue = "";
				} else {
					stringValue = yield toString(stringValue);
				}
			}

			stringValues.push(stringValue);
		}

		return factory.createPrimitive(stringValues.join(separator));
	}, 1, "Array.prototype.join"));
}