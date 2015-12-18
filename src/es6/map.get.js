import {assertIsMap} from "../utils/contracts";
import {findIndex} from "./collection-helpers";
import {UNDEFINED} from "../types/primitive-type";

export default function ($target, env, factory) {
	$target.define("get", factory.createBuiltInFunction(function (key) {
		assertIsMap(this.object, "Map.prototype.get");

		let index = findIndex(this.object, key);
		if (index >= 0) {
			return this.object.data[index].value;
		}

		return UNDEFINED;
	}, 1, "Map.prototype.get"));
}