import * as convert from "./convert";

function* addOrConcat (env, a, b) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value + b.value;
	}

	a = yield convert.toPrimitive(env, a);
	b = yield convert.toPrimitive(env, b);
	return a + b;
}

export default {
	["+"]: addOrConcat,
	*["-"] (env, a, b) { return (yield convert.toNumber(env, a)) - (yield convert.toNumber(env, b)); },
	*["/"] (env, a, b) { return (yield convert.toNumber(env, a)) / (yield convert.toNumber(env, b)); },
	*["*"] (env, a, b) { return (yield convert.toNumber(env, a)) * (yield convert.toNumber(env, b)); },
	*["<<"] (env, a, b) { return (yield convert.toPrimitive(env, a)) << (yield convert.toPrimitive(env, b)); },
	*[">>"] (env, a, b) { return (yield convert.toPrimitive(env, a)) >> (yield convert.toPrimitive(env, b)); },
	*[">>>"] (env, a, b) { return (yield convert.toPrimitive(env, a)) >>> (yield convert.toPrimitive(env, b)); },
	*["%"] (env, a, b) { return (yield convert.toPrimitive(env, a)) % (yield convert.toPrimitive(env, b)); },
	*["|"] (env, a, b) { return (yield convert.toInt32(env, a)) | (yield convert.toInt32(env, b)); },
	*["^"] (env, a, b) { return (yield convert.toInt32(env, a)) ^ (yield convert.toInt32(env, b)); },
	*["&"] (env, a, b) { return (yield convert.toInt32(env, a)) & (yield convert.toInt32(env, b)); },
	*["in"] (env, a, b) {
		a = yield convert.toString(env, a);
		if (b.isPrimitive) {
			let bString = yield convert.toString(env, b);
			throw new TypeError(`Cannot use 'in' operator to search for '${a}' in ${bString}`);
		}

		return b.hasProperty(a);
	},

	["instanceof"] (env, a, b) {
		if (b.type !== "function") {
			throw new TypeError(`Expecting a function in instanceof check, but got ${b.type}`);
		}

		if (a.isPrimitive) {
			return false;
		}

		return b.hasInstance(a);
	}
};
