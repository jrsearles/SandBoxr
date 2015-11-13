import {toPrimitive, toNumber, toInt32, toString, toPropertyKey} from "./native";

function neg (value) {
	if (value === undefined) {
		return false;
	}

	return !value;
}

function pos (value) {
	return !!value;
}

const ops = {
	// algorithms
	areSame (a, b) {
		if (a.type !== b.type) {
			return false;
		}

		if (a.isPrimitive && b.isPrimitive) {
			if (a.value == null) {
				return true;
			}

			if (a.type === "number") {
				if (isNaN(a.value) && isNaN(b.value)) {
					return true;
				}

				if (a.value === 0) {
					// this will account for negative zero
					return 1 / a.value === 1 / b.value;
				}
			}

			return a.value === b.value;
		}

		return a === b;
	},

	areSameOrZero (a, b) {
		if (a.type !== b.type) {
			return false;
		}

		if (a.isPrimitive && b.isPrimitive) {
			if (a.value == null) {
				return true;
			}

			if (a.type === "number") {
				if (isNaN(a.value) && isNaN(b.value)) {
					return true;
				}
			}

			return a.value === b.value;
		}

		return a === b;
	},

	*coerciveEquals (a, b) {
		/* eslint-disable eqeqeq */
		if (a.isPrimitive && b.isPrimitive) {
			return a.value == b.value;
		}

		if (a.type === b.type) {
			return this.strictEquals(a, b);
		}

		let primitiveA = yield toPrimitive(a);
		let primitiveB = yield toPrimitive(b);

		if ((typeof primitiveA === "number" || typeof primitiveB === "number") || (typeof primitiveA === "boolean" || typeof primitiveB === "boolean")) {
			return Number(primitiveA) === Number(primitiveB);
		}

		if (typeof primitiveA === "string") {
			return primitiveA === (yield toPrimitive(b, "string"));
		}

		if (typeof primitiveB === "string") {
			return (yield toPrimitive(a, "string")) === primitiveB;
		}

		// use native implicit comarison
		return primitiveA == primitiveB;
		/* eslint-enable eqeqeq */
	},

	strictEquals (a, b) {
		if (a.isPrimitive && b.isPrimitive) {
			return a.value === b.value;
		}

		if (a.isPrimitive || b.isPrimitive) {
			return false;
		}

		return a === b;
	},

	*relationalCompare (a, b, leftFirst) {
		let primitiveA, primitiveB;
		if (leftFirst) {
			primitiveA = yield toPrimitive(a, "number");
			primitiveB = yield toPrimitive(b, "number");
		} else {
			primitiveB = yield toPrimitive(b, "number");
			primitiveA = yield toPrimitive(a, "number");
		}

		if (typeof primitiveA === "string" && typeof primitiveB === "string") {
			return primitiveA < primitiveB;
		}

		primitiveA = Number(primitiveA);
		primitiveB = Number(primitiveB);

		if (isNaN(primitiveA) || isNaN(primitiveB)) {
			return undefined;
		}

		return primitiveA < primitiveB;
	},

	// equality operators
	*["=="] (a, b) { return yield this.coerciveEquals(a, b); },
	*["!="] (a, b) { return !(yield this.coerciveEquals(a, b)); },

	*["==="] (a, b) { return yield this.strictEquals(a, b); },
	*["!=="] (a, b) { return !(yield this.strictEquals(a, b)); },

	// additive operators
	*["+"] (a, b) {
		if (a.isPrimitive && b.isPrimitive) {
			return a.value + b.value;
		}

		a = yield toPrimitive(a);
		b = yield toPrimitive(b);
		return a + b;
	},
	*["-"] (a, b) { return (yield toNumber(a)) - (yield toNumber(b)); },

	// multiplicative operators
	*["/"] (a, b) { return (yield toNumber(a)) / (yield toNumber(b)); },
	*["*"] (a, b) { return (yield toNumber(a)) * (yield toNumber(b)); },
	*["%"] (a, b) { return (yield toPrimitive(a)) % (yield toPrimitive(b)); },

	// bitwise shift operators
	*["<<"] (a, b) { return (yield toPrimitive(a)) << (yield toPrimitive(b)); },
	*[">>"] (a, b) { return (yield toPrimitive(a)) >> (yield toPrimitive(b)); },
	*[">>>"] (a, b) { return (yield toPrimitive(a)) >>> (yield toPrimitive(b)); },

	*["|"] (a, b) { return (yield toInt32(a)) | (yield toInt32(b)); },
	*["^"] (a, b) { return (yield toInt32(a)) ^ (yield toInt32(b)); },
	*["&"] (a, b) { return (yield toInt32(a)) & (yield toInt32(b)); },

	// relational operators
	*["<"] (a, b) { return pos(yield this.relationalCompare(a, b, true)); },
	*["<="] (a, b) { return neg(yield this.relationalCompare(b, a, false)); },
	*[">"] (a, b) { return pos(yield this.relationalCompare(b, a, false)); },
	*[">="] (a, b) { return neg(yield this.relationalCompare(a, b, true)); },

	*["in"] (a, b) {
		a = yield toPropertyKey(a);
		if (b.isPrimitive) {
			let bString = yield toString(b);
			throw TypeError(`Cannot use 'in' operator to search for '${a}' in ${bString}`);
		}

		return b.has(a);
	},

	["instanceof"] (a, b) {
		if (b.type !== "function") {
			throw TypeError(`Expecting a function in instanceof check, but got ${b.type}`);
		}

		if (a.isPrimitive) {
			return false;
		}

		return b.hasInstance(a);
	}
};

export default ops;
