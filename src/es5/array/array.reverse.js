import {toLength} from "../../utils/native";

export default function ($target, env, factory) {
	$target.define("reverse", factory.createBuiltInFunction(function* () {
		let length = yield toLength(this.node);
		let middle = Math.floor(length / 2);
		let lower = 0;
		let upper, upperValue, lowerValue;

		while (lower !== middle) {
			upper = length - lower - 1;
			lowerValue = this.node.has(lower) && this.node.getValue(lower);
			upperValue = this.node.has(upper) && this.node.getValue(upper);

			if (upperValue) {
				this.node.setValue(lower, upperValue);
			}

			if (lowerValue) {
				this.node.setValue(upper, lowerValue);
			}

			if (upperValue && !lowerValue) {
				this.node.deleteProperty(upper);
			} else if (lowerValue && !upperValue) {
				this.node.deleteProperty(lower);
			}

			lower++;
		}

		return this.node;
	}, 0, "Array.prototype.reverse"));

}