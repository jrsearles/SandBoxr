import * as convert from "./convert";

function negate (value) {
	if (value === undefined) {
		return false;
	}

	return !value;
}

const comparers = {
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

	implicitEquals (env, a, b) {
		if (a.isPrimitive && b.isPrimitive) {
			return a.value == b.value;
		}

		if ((a.type === "object" && b.type === "object") || (a.type === "function" && b.type === "function")) {
			return a === b;
		}

		let primitiveA = convert.toPrimitive(env, a);
		let primitiveB = convert.toPrimitive(env, b);

		if ((typeof primitiveA === "number" || typeof primitiveB === "number") || (typeof primitiveA === "boolean" || typeof primitiveB === "boolean")) {
			return Number(primitiveA) === Number(primitiveB);
		}

		if (typeof primitiveA === "string") {
			return primitiveA === convert.toPrimitive(env, b, "string");
		}

		if (typeof primitiveB === "string") {
			return convert.toPrimitive(env, a, "string") === primitiveB;
		}

		return primitiveA == primitiveB;
	},

	strictEquals (env, a, b) {
		if (a.isPrimitive && b.isPrimitive) {
			return a.value === b.value;
		}

		if (a.isPrimitive || b.isPrimitive) {
			return false;
		}

		return a === b;
	},

	relationalCompare (env, a, b, leftFirst) {
		let primitiveA, primitiveB;
		if (leftFirst) {
			primitiveA = convert.toPrimitive(env, a, "number");
			primitiveB = convert.toPrimitive(env, b, "number");
		} else {
			primitiveB = convert.toPrimitive(env, b, "number");
			primitiveA = convert.toPrimitive(env, a, "number");
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

	["=="] () { return this.implicitEquals.apply(this, arguments); },
	["!="] () { return !this.implicitEquals.apply(this, arguments); },

	["==="] () { return this.strictEquals.apply(this, arguments); },
	["!=="] () { return !this.strictEquals.apply(this, arguments); },

	["<"] (env, a, b) { return !!this.relationalCompare(env, a, b, true); },
	["<="] (env, a, b) { return negate(this.relationalCompare(env, b, a, false)); },
	[">"] (env, a, b) { return !!this.relationalCompare(env, b, a, false); },
	[">="] (env, a, b) { return negate(this.relationalCompare(env, a, b, true)); }
};

export default comparers;