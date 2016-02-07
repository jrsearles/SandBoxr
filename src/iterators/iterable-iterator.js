import {toBoolean} from "../utils/native";
import {exhaust as x} from "../utils/async";
import {UNDEFINED} from "../types/primitive-type";
import {getMethod} from "../utils/helpers";

export default function IterableIterator (it) {
  this.currentIndex = 0;
  this.iterator = it;
  this.advancer = it.getValue("next");
}

IterableIterator.prototype = {
  constructor: IterableIterator,
  
	[Symbol.iterator] () {
		return this;
	},

	next () {
		let result = x(this.advancer.call(this.iterator));
		let value = {key: this.currentIndex++, value: UNDEFINED};

		let done = toBoolean(result.getValue("done"));
		let valueProperty = result.getProperty("value");
		if (valueProperty) {
			value.value = valueProperty.getValue();
		}

		return {done, value};
	},

	*each (func) {
		let done = false;

		while (!done) {
			try {
				let current;
				({done, value: current} = this.next());

				if (!done) {
					yield func(current.value || UNDEFINED);
				}
			} catch (err) {
				this.return();
				throw err;
			}
		}
	},

	["return"] () {
		let returnFunc = getMethod(this.iterator, "return");
		if (returnFunc) {
			return x(returnFunc.call(this.iterator));
		}

		return UNDEFINED;
	},
};

IterableIterator.create = function (it) {
  return new IterableIterator(it);
};
