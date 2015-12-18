import {assertIsNotNullOrUndefined, isFunction} from "../../utils/contracts";

export default function ($target, env, factory) {
	$target.define("toString", factory.createBuiltInFunction(function* () {
		assertIsNotNullOrUndefined(this.object, "Array.prototype.toString");
		let func = this.object.getValue("join");
		if (!func || !isFunction(func)) {
			func = env.global.getValue("Object").getValue("toString");
		}

		return yield func.call(this.object);
	}, 0, "Array.prototype.toString"));
}
