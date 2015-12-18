import {toString, toUInt32} from "../../utils/native";
import {isUndefined} from "../../utils/contracts";

export default function ($target, env, factory) {
	$target.define("split", factory.createBuiltInFunction(function* (separator, limit) {
		let stringValue = yield toString(this.object);
		separator = separator && separator.getValue();
		limit = limit && limit.getValue();
		let limitValue = isUndefined(limit) ? undefined : (yield toUInt32(limit));

		let arr = factory.createArray();
		if (isUndefined(separator)) {
			arr.setValue(0, factory.createPrimitive(stringValue));
		} else {
			let separatorValue;
			if (separator.className === "RegExp") {
				separatorValue = separator.source;
			} else {
				separatorValue = yield toString(separator);
			}

			let result = stringValue.split(separatorValue, limitValue);
			result.forEach(function (value, index) {
				arr.setValue(index, factory.createPrimitive(value));
			});
		}

		return arr;
	}, 2, "String.prototype.split"));
}
