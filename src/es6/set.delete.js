import {assertIsSet} from "../utils/contracts";

export default function ($target, env, factory) {
	$target.define("delete", factory.createBuiltInFunction(function (value) {
		assertIsSet(this.object, "Set.prototype.delete");

		let entries = this.object.data;
		let index = entries.length;

		while (index--) {
			let current = entries[index];
			if (current && env.ops.areSameOrZero(current, value)) {
				entries[index] = undefined;
				return factory.createPrimitive(true);
			}
		}

		return factory.createPrimitive(false);
	}, 1, "Set.prototype.delete"));

}
