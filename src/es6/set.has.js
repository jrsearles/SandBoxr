import {assertIsSet} from "../utils/contracts";

export default function ($target, env, factory) {
	$target.define("has", factory.createBuiltInFunction(function (value) {
		assertIsSet(this.node, "Set.prototype.has");
		let has = this.node.data.some(e => e && env.ops.areSameOrZero(e, value));
		return factory.createPrimitive(has);
	}, 1, "Set.prototype.has"));
}
