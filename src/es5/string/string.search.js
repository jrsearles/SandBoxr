import {toString} from "../../utils/native";

export default function ($target, env, factory) {
	$target.define("search", factory.createBuiltInFunction(function* (regex) {
		let stringValue = yield toString(this.object);
		let underlyingRegex;

		if (regex) {
			if (regex.className === "RegExp") {
				underlyingRegex = regex.source;
			} else {
				underlyingRegex = new RegExp(yield toString(regex));
			}
		}

		return factory.createPrimitive(stringValue.search(underlyingRegex));
	}, 1, "String.prototype.search"));
}
