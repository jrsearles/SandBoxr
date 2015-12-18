import {assertIsMap} from "../utils/contracts";
import {findIndex} from "./collection-helpers";

export default function ($target, env, factory) {
	$target.define("set", factory.createBuiltInFunction(function (key, value) {
		assertIsMap(this.object, "Map.prototype.set");

		let index = findIndex(this.object, key);
		if (index >= 0) {
			this.object.data[index].value = value;
			return this.object;
		}

		this.object.data.push({key, value});
		return this.object;
	}, 2, "Map.prototype.set"));
}