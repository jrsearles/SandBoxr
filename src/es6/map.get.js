import {assertIsMap} from "../utils/contracts";
import {findIndex} from "./collection-helpers";
import {UNDEFINED} from "../types/primitive-type";

export default function ($target, env, factory) {
	$target.define("get", factory.createBuiltInFunction(function (key) {
		assertIsMap(this.node, "Map.prototype.get");

		let index = findIndex(this.node, key);
		if (index >= 0) {
			return this.node.data[index].value;
		}

		return UNDEFINED;
	}, 1, "Map.prototype.get"));
}