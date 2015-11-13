import {assertIsNotNullOrUndefined, isFunction} from "../../utils/contracts";

export default function ($target, env, factory) {
	$target.define("toString", factory.createBuiltInFunction(function* () {
		assertIsNotNullOrUndefined(this.node, "Array.prototype.toString");
		let func = this.node.getValue("join");
		if (!func || !isFunction(func)) {
			func = env.global.getValue("Object").getValue("toString");
		}

		return yield func.call(this.node);
	}, 0, "Array.prototype.toString"));
}
