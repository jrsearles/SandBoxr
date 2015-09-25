import {toPrimitive,toNumber,toInt32,toString} from "./native";

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

	*coerciveEquals (a, b) {
		/* eslint-disable eqeqeq */
		if (a.isPrimitive && b.isPrimitive) {
			return a.value == b.value;
		}

		if ((a.type === "object" && b.type === "object") || (a.type === "function" && b.type === "function")) {
			return a === b;
		}

		let primitiveA = yield toPrimitive(this.env, a);
		let primitiveB = yield toPrimitive(this.env, b);

		if ((typeof primitiveA === "number" || typeof primitiveB === "number") || (typeof primitiveA === "boolean" || typeof primitiveB === "boolean")) {
			return Number(primitiveA) === Number(primitiveB);
		}

		if (typeof primitiveA === "string") {
			return primitiveA === (yield toPrimitive(this.env, b, "string"));
		}

		if (typeof primitiveB === "string") {
			return (yield toPrimitive(this.env, a, "string")) === primitiveB;
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
			primitiveA = yield toPrimitive(this.env, a, "number");
			primitiveB = yield toPrimitive(this.env, b, "number");
		} else {
			primitiveB = yield toPrimitive(this.env, b, "number");
			primitiveA = yield toPrimitive(this.env, a, "number");
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

		a = yield toPrimitive(this.env, a);
		b = yield toPrimitive(this.env, b);
		return a + b;
	},
	*["-"] (a, b) { return (yield toNumber(this.env, a)) - (yield toNumber(this.env, b)); },

	// multiplicative operators
	*["/"] (a, b) { return (yield toNumber(this.env, a)) / (yield toNumber(this.env, b)); },
	*["*"] (a, b) { return (yield toNumber(this.env, a)) * (yield toNumber(this.env, b)); },
	*["%"] (a, b) { return (yield toPrimitive(this.env, a)) % (yield toPrimitive(this.env, b)); },

	// bitwise shift operators
	*["<<"] (a, b) { return (yield toPrimitive(this.env, a)) << (yield toPrimitive(this.env, b)); },
	*[">>"] (a, b) { return (yield toPrimitive(this.env, a)) >> (yield toPrimitive(this.env, b)); },
	*[">>>"] (a, b) { return (yield toPrimitive(this.env, a)) >>> (yield toPrimitive(this.env, b)); },

	*["|"] (a, b) { return (yield toInt32(this.env, a)) | (yield toInt32(this.env, b)); },
	*["^"] (a, b) { return (yield toInt32(this.env, a)) ^ (yield toInt32(this.env, b)); },
	*["&"] (a, b) { return (yield toInt32(this.env, a)) & (yield toInt32(this.env, b)); },

	// relational operators
	*["<"] (a, b) { return pos(yield this.relationalCompare(a, b, true)); },
	*["<="] (a, b) { return neg(yield this.relationalCompare(b, a, false)); },
	*[">"] (a, b) { return pos(yield this.relationalCompare(b, a, false)); },
	*[">="] (a, b) { return neg(yield this.relationalCompare(a, b, true)); },

	*["in"] (a, b) {
		a = yield toString(this.env, a);
		if (b.isPrimitive) {
			let bString = yield toString(this.env, b);
			throw new TypeError(`Cannot use 'in' operator to search for '${a}' in ${bString}`);
		}

		return b.hasProperty(a);
	},

	["instanceof"] (a, b) {
		if (b.type !== "function") {
			throw new TypeError(`Expecting a function in instanceof check, but got ${b.type}`);
		}

		if (a.isPrimitive) {
			return false;
		}

		return b.hasInstance(a);
	}
};

export default ops;
