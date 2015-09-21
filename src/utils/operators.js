import {toPrimitive,toNumber,toInt32,toString} from "./native";

function* addOrConcat (env, a, b) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value + b.value;
	}

	a = yield toPrimitive(env, a);
	b = yield toPrimitive(env, b);
	return a + b;
}

export default {
	["+"]: addOrConcat,
	*["-"] (env, a, b) { return (yield toNumber(env, a)) - (yield toNumber(env, b)); },
	*["/"] (env, a, b) { return (yield toNumber(env, a)) / (yield toNumber(env, b)); },
	*["*"] (env, a, b) { return (yield toNumber(env, a)) * (yield toNumber(env, b)); },
	*["<<"] (env, a, b) { return (yield toPrimitive(env, a)) << (yield toPrimitive(env, b)); },
	*[">>"] (env, a, b) { return (yield toPrimitive(env, a)) >> (yield toPrimitive(env, b)); },
	*[">>>"] (env, a, b) { return (yield toPrimitive(env, a)) >>> (yield toPrimitive(env, b)); },
	*["%"] (env, a, b) { return (yield toPrimitive(env, a)) % (yield toPrimitive(env, b)); },
	*["|"] (env, a, b) { return (yield toInt32(env, a)) | (yield toInt32(env, b)); },
	*["^"] (env, a, b) { return (yield toInt32(env, a)) ^ (yield toInt32(env, b)); },
	*["&"] (env, a, b) { return (yield toInt32(env, a)) & (yield toInt32(env, b)); },
	*["in"] (env, a, b) {
		a = yield toString(env, a);
		if (b.isPrimitive) {
			let bString = yield toString(env, b);
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
