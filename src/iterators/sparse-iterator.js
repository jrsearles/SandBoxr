import {isInteger} from "../utils/contracts";

const ASCENDING = (a, b) => a - b;
const DESCENDING = (a, b) => b - a;

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
				if (!(name in this.props) && isInteger(name)) {
					let index = Number(name);

					if (index >= this.start && index <= this.end) {
						this.props[name] = current.getOwnProperty(name);
						this.keys.push(index);
					}
				}
			}

			current = current.getPrototype();
		}

		this.keys.sort(this.asc ? ASCENDING : DESCENDING);
	}

	next () {
		if (!this.version || this.shouldReset()) {
			this.reset();
		}

		if (this.keys.length > 0) {
			let key = this.position = this.keys.shift();
			let value = this.props[key].getValue();

			return {
				value: {value, key},
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
