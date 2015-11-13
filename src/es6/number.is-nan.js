import {isNumber} from "../utils/contracts";

export default function (target, env, factory) {
	target.define("isNaN", factory.createBuiltInFunction(function (value) {
		if (!isNumber(value)) {
			return factory.createPrimitive(false);
		}

		return factory.createPrimitive(isNaN(value.toNative()));
	}, 1, "Number.isNaN"));
}
