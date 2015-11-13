import {toLength, toString} from "../../utils/native";
import {isNullOrUndefined} from "../../utils/contracts";

export default function ($target, env, factory) {
	$target.define("toLocaleString", factory.createBuiltInFunction(function* () {
		let length = yield toLength(this.node);
		let arr = new Array(length);
		let i = 0;
		let current;

		while (i < length) {
			if (this.node.has(i)) {
				current = this.node.getValue(i);

				if (isNullOrUndefined(current)) {
					arr[i] = "";
				} else {
					let func = current.getValue("toLocaleString") || current.getValue("toString");
					arr[i] = yield toString(yield func.call(current));
				}
			}

			i++;
		}

		return factory.createPrimitive(arr.join());
	}, 0, "Array.prototype.toLocaleString"));
}