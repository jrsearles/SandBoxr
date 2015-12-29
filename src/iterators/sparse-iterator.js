import {isInteger} from "../utils/contracts";

const ASCENDING = (a, b) => a - b;
const DESCENDING = (a, b) => b - a;

const isInRange = (value, start, end) => value >= start && value <= end;

const isValidIndex = function (keys, start, end) {
	return function (key) {
		return !(key in keys)
			&& isInteger(key)
			&& isInRange(key, start, end);
	};
};

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

			current.getOwnPropertyKeys("String")
				.filter(isValidIndex(this.props, this.start, this.end))
				.forEach(key => {
					this.props[key] = current.getProperty(key);
					this.keys.push(Number(key));
				}); 

			current = current.getPrototype();
		}

		this.keys.sort(this.asc ? ASCENDING : DESCENDING);
	}

	next () {
		if (!this.version || this.shouldReset()) {
			this.reset();
		}

		if (this.keys.length > 0) {
			let key = this.currentIndex = this.keys.shift();
			let value = this.props[key].getValue();

			return {
				value: {key, value},
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
				this.start = this.currentIndex + 1;
			} else {
				this.end = this.currentIndex - 1;
			}

			return true;
		}

		return false;
	}

	static create (arr, start, end, desc) {
		return new SparseIterator(arr, start, end, desc);
	}
}
