import {toString} from "../utils/native";

export default function (target, env, factory) {
	target.define("parseFloat", factory.createBuiltInFunction(function* (value) {
		let stringValue = yield toString(value);
		return factory.createPrimitive(parseFloat(stringValue));
	}, 1, "Number.parseFloat"));
}
