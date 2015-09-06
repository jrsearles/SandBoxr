import * as contracts from "../utils/contracts";
import "../polyfills";

export default class SparseIterator {
	constructor (obj, start, end, desc) {
		this.object = obj;
		this.start = start;
		this.end = end;
		this.asc = !desc;
		this.version = 0;
	}

	[Symbol.iterator] () {
		return this;
	}

	reset () {
		this.version = 0;
		this.prototypes = [];
		this.props = Object.create(null);
		this.keys = [];

		let current = this.object;

		while (current) {
			this.prototypes.push(current);
			this.version += current.version;

			for (let name in current.properties) {
				if (!(name in this.props) && contracts.isInteger(name)) {
					let index = Number(name);

					if (index >= this.start && index <= this.end) {
						this.props[name] = current.getOwnProperty(name);
						this.keys.push(index);
					}
				}
			}

			current = current.getPrototype();
		}

		this.keys.sort();
	}

	next () {
		if (!this.version || this.shouldReset()) {
			this.reset();
		}

		if (this.keys.length > 0) {
			let index = this.position = this.keys[this.asc ? "shift" : "pop"]();
			let value = this.props[index].getValue();

			return {
				value: { value, index },
				done: false
			};
		}

		return {
			done: true
		};
	}

	shouldReset () {
		let currentVersion = this.prototypes.reduce((v, o) => o.version + v, 0);
		if (currentVersion !== this.version) {
			if (this.asc) {
				this.start = this.position + 1;
			} else {
				this.end = this.position - 1;
			}

			return true;
		}

		return false;
	}

	static create (arr, start, end, desc) {
		return new SparseIterator(arr, start, end, desc);
	}
}
