import * as convert from "./convert";

function addOrConcat (env, a, b) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value + b.value;
	}

	a = convert.toPrimitive(env, a);
	b = convert.toPrimitive(env, b);
	return a + b;
}

export default {
	["+"]: addOrConcat,
	["-"] (env, a, b) { return convert.toNumber(env, a) - convert.toNumber(env, b); },
	["/"] (env, a, b) { return convert.toNumber(env, a) / convert.toNumber(env, b); },
	["*"] (env, a, b) { return convert.toNumber(env, a) * convert.toNumber(env, b); },
	["<<"] (env, a, b) { return convert.toPrimitive(env, a) << convert.toPrimitive(env, b); },
	[">>"] (env, a, b) { return convert.toPrimitive(env, a) >> convert.toPrimitive(env, b); },
	[">>>"] (env, a, b) { return convert.toPrimitive(env, a) >>> convert.toPrimitive(env, b); },
	["%"] (env, a, b) { return convert.toPrimitive(env, a) % convert.toPrimitive(env, b); },
	["|"] (env, a, b) { return convert.toInt32(env, a) | convert.toInt32(env, b); },
	["^"] (env, a, b) { return convert.toInt32(env, a) ^ convert.toInt32(env, b); },
	["&"] (env, a, b) { return convert.toInt32(env, a) & convert.toInt32(env, b); },
	["in"] (env, a, b) {
		a = convert.toString(env, a);
		if (b.isPrimitive) {
			throw new TypeError(`Cannot use 'in' operator to search for '${a}' in ${convert.toString(env, b)}`);
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
