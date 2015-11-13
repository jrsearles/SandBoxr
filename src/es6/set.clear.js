import {assertIsSet} from "../utils/contracts";

export default function ($target, env, factory) {
	$target.define("clear", factory.createBuiltInFunction(function () {
		assertIsSet(this.node, "Set.prototype.clear");
		this.node.data = [];
	}, 0, "Set.prototype.clear"));
}
