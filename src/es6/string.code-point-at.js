import {UNDEFINED} from "../types/primitive-type";
import {toInteger, toString} from "../utils/native";
import {assertIsNotNullOrUndefined} from "../utils/contracts";

export default function (target, env, factory) {
	target.define("codePointAt", factory.createBuiltInFunction(function* (pos) {
		assertIsNotNullOrUndefined(this.node, "String.prototype.codePointAt");
		let stringValue = yield toString(this.node);
		let position = yield toInteger(pos);

		if (position < 0 || position >= stringValue.length) {
			return UNDEFINED;
		}

		return factory.createPrimitive(stringValue.codePointAt(position));
	}, 1, "String.prototype.codePointAt"));
}