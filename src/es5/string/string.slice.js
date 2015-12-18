import {toString, toInteger} from "../../utils/native";
import {isNullOrUndefined} from "../../utils/contracts";

export default function ($target, env, factory) {
	$target.define("slice", factory.createBuiltInFunction(function* (start, end) {
		let stringValue = yield toString(this.object);
		let startValue = yield toInteger(start);
		let endValue;

		if (!isNullOrUndefined(end)) {
			endValue = yield toInteger(end);
		}

		return factory.createPrimitive(stringValue.slice(startValue, endValue));
	}, 2, "String.prototype.slice"));
}
