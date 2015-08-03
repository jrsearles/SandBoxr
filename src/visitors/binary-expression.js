import * as convert from "../utils/convert";

function implicitEquals (a, b, env) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value == b.value;
	}

	if ((a.type === "object" && b.type === "object") || (a.type === "function" && b.type === "function")) {
		return a === b;
	}

	var primitiveA = convert.toPrimitive(env, a);
	var primitiveB = convert.toPrimitive(env, b);

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
}

function strictEquals (a, b) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value === b.value;
	}

	if (a.isPrimitive || b.isPrimitive) {
		return false;
	}

	return a === b;
}

function not (fn) {
	return function (a, b, e) {
		return !fn(a, b, e);
	};
}

function add (a, b, env) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value + b.value;
	}

	a = convert.toPrimitive(env, a);
	b = convert.toPrimitive(env, b);
	return a + b;
}

function toNumber (env, obj) {
	if (obj.className === "Number") {
		return obj.value;
	}

	return convert.toNumber(env, obj);
}

/* eslint eqeqeq:0 */
var binaryOperators = {
	"+": add,
	"-": function (a, b, e) { return toNumber(e, a) - toNumber(e, b); },
	"/": function (a, b, e) { return toNumber(e, a) / toNumber(e, b); },
	"*": function (a, b, e) { return toNumber(e, a) * toNumber(e, b); },
	"==": implicitEquals,
	"!=": not(implicitEquals),
	"===": strictEquals,
	"!==": not(strictEquals),
	"<": function (a, b, e) { return convert.toPrimitive(e, a) < convert.toPrimitive(e, b); },
	"<=": function (a, b, e) { return convert.toPrimitive(e, a) <= convert.toPrimitive(e, b); },
	">": function (a, b, e) { return convert.toPrimitive(e, a) > convert.toPrimitive(e, b); },
	">=": function (a, b, e) { return convert.toPrimitive(e, a) >= convert.toPrimitive(e, b); },
	"<<": function (a, b, e) { return convert.toPrimitive(e, a) << convert.toPrimitive(e, b); },
	">>": function (a, b, e) { return convert.toPrimitive(e, a) >> convert.toPrimitive(e, b); },
	">>>": function (a, b, e) { return convert.toPrimitive(e, a) >>> convert.toPrimitive(e, b); },
	"%": function (a, b, e) { return convert.toPrimitive(e, a) % convert.toPrimitive(e, b); },
	"|": function (a, b, e) { return convert.toInt32(e, a) | convert.toInt32(e, b); },
	"^": function (a, b, e) { return convert.toInt32(e, a) ^ convert.toInt32(e, b); },
	"&": function (a, b, e) { return convert.toInt32(e, a) & convert.toInt32(e, b); },
	"in": function (a, b, e) {
		a = convert.toString(e, a);
		if (b.isPrimitive) {
			throw new TypeError("Cannot use 'in' operator to search for '" + a + "' in " + convert.toString(e, b));
		}

		return b.hasProperty(a);
	},
	"instanceof": function (a, b) {
		if (b.type !== "function") {
			throw new TypeError("Expecting a function in instanceof check, but got " + b.type);
		}

		if (a.isPrimitive) {
			return false;
		}

		return b.hasInstance(a);
	}
};

export default function BinaryExpression (context) {
	var undef = context.env.global.getProperty("undefined").getValue();
	var left = context.create(context.node.left).execute().result;
	var leftValue = left.getValue() || undef;

	var right = context.create(context.node.right).execute().result;
	var rightValue = right.getValue() || undef;

	var newValue = binaryOperators[context.node.operator](leftValue, rightValue, context.env);

	return context.result(context.env.objectFactory.createPrimitive(newValue));
}
