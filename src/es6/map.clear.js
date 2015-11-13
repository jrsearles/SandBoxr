import {assertIsMap} from "../utils/contracts";

export default function ($target, env, factory) {
	$target.define("clear", factory.createBuiltInFunction(function () {
		assertIsMap(this.node, "Map.prototype.clear");
		this.node.data = [];
	}, 0, "Map.prototype.clear"));
}
