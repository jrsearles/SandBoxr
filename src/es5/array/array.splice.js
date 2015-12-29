import {toLength, toInteger} from "../../utils/native";

export default function ($target, env, factory) {
	$target.define("splice", factory.createBuiltInFunction(function* (start, deleteCount, ...elements) {
		let length = yield toLength(this.object);

		start = yield toInteger(start);
		if (start < 0) {
			start = Math.max(length + start, 0);
		} else {
			start = Math.min(start, length);
		}

		deleteCount = yield toInteger(deleteCount);
		if (deleteCount < 0) {
			deleteCount = 0;
		} else {
			deleteCount = Math.min(Math.max(deleteCount, 0), length - start);
		}

		let removed = yield factory.createFromSpeciesOrDefault(this.object, $target.getValue("constructor"));

		let k = 0;
		while (k < deleteCount) {
			if (this.object.has(k + start)) {
				removed.defineOwnProperty(k, {value: this.object.getValue(k + start), configurable: true, enumerable: true, writable: true});
				// removed.setIndex(k, this.object.getValue(k + start));
			}

			k++;
		}
		
		removed.setValue("length", factory.createPrimitive(k));

		let newCount = elements.length;
		if (newCount < deleteCount) {
			k = start;

			while (k < length - deleteCount) {
				if (this.object.has(k + deleteCount)) {
					// this.object.defineOwnProperty(k + newCount, {value: this.object.getValue(k + deleteCount), configurable: true, enumerable: true, writable: true});
					this.object.setValue(k + newCount, this.object.getValue(k + deleteCount));
				} else {
					this.object.deleteProperty(k + newCount);
				}

				k++;
			}

			k = length;
			while (k > length - deleteCount + newCount) {
				this.object.deleteProperty(--k);
			}
		} else if (newCount > deleteCount) {
			k = length - deleteCount;
			while (k > start) {
				if (this.object.has(k + deleteCount - 1)) {
					// this.object.defineOwnProperty(k + newCount - 1, {value: this.object.getValue(k + deleteCount - 1), configurable: true, enumerable: true, writable: true});
					this.object.setValue(k + newCount - 1, this.object.getValue(k + deleteCount - 1));
				} else {
					this.object.deleteProperty(k + newCount - 1);
				}

				k--;
			}
		}

		k = start;
		for (let i = 0; i < newCount; i++) {
			// this.object.defineOwnProperty(k, {value: elements[i], configurable: true, enumerable: true, writable: true});
			this.object.setValue(k, elements[i]);
			k++;
		}

		this.object.setValue("length", factory.createPrimitive(length - deleteCount + newCount));
		return removed;
	}, 2, "Array.prototype.splice"));
}