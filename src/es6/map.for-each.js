import {UNDEFINED} from "../types/primitive-type";
import {assertIsMap, assertIsFunction} from "../utils/contracts";

export default function ($target, env, factory) {
	$target.define("forEach", factory.createBuiltInFunction(function* (callback, thisArg) {
		assertIsMap(this.node, "Map.prototype.forEach");
		assertIsFunction(callback, "callback");

		thisArg = thisArg || UNDEFINED;
		let data = this.node.data;
		let index = 0;

		// length might change during iteration
		while (index < data.length) {
			let entry = data[index++];
			if (entry) {
				let args = [entry.value, entry.key, this.node];
				yield callback.call(thisArg, args);
			}
		}
	}, 1, "Map.prototype.forEach"));
}