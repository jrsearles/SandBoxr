import {toPrimitive} from "../utils/native";

export default function (target, env, factory) {
	target.define("parseInt", factory.createBuiltInFunction(function* (value, radix) {
		let stringValue = yield toString(value);
		radix = yield toPrimitive(radix, "number");
		return factory.createPrimitive(parseInt(stringValue, radix));
	}, 2, "Number.parseInt"));
}
