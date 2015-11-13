import {assertIsSet} from "../utils/contracts";

export default function ($target, env, factory) {
	$target.define("add", factory.createBuiltInFunction(function (value) {
		assertIsSet(this.node, "Set.prototype.add");

		if (!this.node.data.some(e => e && env.ops.areSameOrZero(e, value))) {
			this.node.data.push(value);
		}

		return this.node;
	}, 1, "Set.prototype.add"));
}
