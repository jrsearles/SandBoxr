import {assertIsObject} from "../utils/contracts";
import {NULL} from "../types/primitive-type";

export default function ($target, env, factory) {
	$target.define("setPrototypeOf", factory.createBuiltInFunction(function (target, proto) {
		assertIsObject(target, "Reflect.setPrototypeOf");

		if (proto !== NULL && proto.type !== "object") {
			throw TypeError("The prototype must be an object or null");
		}

		return factory.createPrimitive(target.setPrototype(proto));
	}, 2, "Reflect.setPrototypeOf"));
}