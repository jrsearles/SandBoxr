import {toString, toInteger} from "../../utils/native";
import {isNullOrUndefined} from "../../utils/contracts";

export default function ($target, env, factory) {
	$target.define("substring", factory.createBuiltInFunction(function* (start, end) {
		let value = yield toString(this.node);
		let length = value.length;

		start = yield toInteger(start);
		end = isNullOrUndefined(end) ? length : (yield toInteger(end));

		return factory.createPrimitive(value.substring(start, end));
	}, 2, "String.prototype.substring"));
}
