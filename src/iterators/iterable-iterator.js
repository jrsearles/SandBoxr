import {toBoolean} from "../utils/native";
import {exhaust as x} from "../utils/async";
import {UNDEFINED} from "../types/primitive-type";

export default class IterableIterator {
	constructor (it) {
		this.currentIndex = 0;
		this.iterator = it;
		this.advancer = it.getValue("next");
	}
	
	[Symbol.iterator] () {
		return this;
	}

	next () {
		let result = x(this.advancer.call(this.iterator));
		let value = {key: this.currentIndex++, value: UNDEFINED};

		let valueProperty = result.getProperty("value");
		if (valueProperty) {
			value.value = valueProperty.getValue();
		}

		let done = toBoolean(result.getValue("done"));
		return {done, value};
	}

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
	}

	["return"] () {
		let propInfo = this.iterator.getProperty("return");
		if (propInfo) {
			let returnFunc = propInfo.getValue();
			return x(returnFunc.call(this.iterator));
		}

		return UNDEFINED;
	}

	static create (it) {
		return new IterableIterator(it);
	}
}

