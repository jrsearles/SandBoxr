import {assertIsMap} from "../utils/contracts";
import {findIndex} from "./collection-helpers";

export default function ($target, env, factory) {
	$target.define("set", factory.createBuiltInFunction(function (key, value) {
		assertIsMap(this.node, "Map.prototype.set");

		let index = findIndex(this.node, key);
		if (index >= 0) {
			this.node.data[index].value = value;
			return this.node;
		}

		this.node.data.push({key, value});
		return this.node;
	}, 2, "Map.prototype.set"));
}