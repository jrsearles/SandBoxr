import {assertIsNotNullOrUndefined} from "../../utils/contracts";

export default function ($target, env, factory) {
	$target.define("isPrototypeOf", factory.createBuiltInFunction(function (obj) {
		assertIsNotNullOrUndefined(this.node, "Object.isPrototypeOf");

		let current = obj;
		while (current) {
			if (this.node === current) {
				return factory.createPrimitive(true);
			}

			current = current.getPrototype();
		}

		return factory.createPrimitive(false);
	}, 1, "Object.isPrototypeOf"));
}
