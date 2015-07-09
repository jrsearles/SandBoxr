var convert = require("../utils/convert");

function implicitEquals (a, b, context) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value == b.value;
	}

	if ((a.type === "object" && b.type === "object") || (a.type === "function" && b.type === "function")) {
		return a === b;
	}

	var primitiveA = convert.toPrimitive(context, a);
	var primitiveB = convert.toPrimitive(context, b);

	if ((typeof primitiveA === "number" || typeof primitiveB === "number") || (typeof primitiveA === "boolean" || typeof primitiveB === "boolean")) {
		return Number(primitiveA) === Number(primitiveB);
	}

	if (typeof primitiveA === "string") {
		return primitiveA === convert.toPrimitive(context, b, "string");
	}

	if (typeof primitiveB === "string") {
		return convert.toPrimitive(context, a, "string") === primitiveB;
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
	return function (a, b, c) {
		return !fn(a, b, c);
	};
}

function add (a, b, context) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value + b.value;
	}

	a = convert.toPrimitive(context, a);
	b = convert.toPrimitive(context, b);
	return a + b;
}

function toNumber (context, obj) {
	if (obj.className === "Number") {
		return obj.toNumber();
	}

	return convert.toPrimitive(context, obj, "number");
}

/* eslint eqeqeq:0 */
var binaryOperators = {
	"+": add,
	"-": function (a, b, c) { return toNumber(c, a) - toNumber(c, b); },
	"/": function (a, b, c) { return toNumber(c, a) / toNumber(c, b); },
	"*": function (a, b, c) { return toNumber(c, a) * toNumber(c, b); },
	"==": implicitEquals,
	"!=": not(implicitEquals),
	"===": strictEquals,
	"!==": not(strictEquals),
	"<": function (a, b, c) { return convert.toPrimitive(c, a) < convert.toPrimitive(c, b); },
	"<=": function (a, b, c) { return convert.toPrimitive(c, a) <= convert.toPrimitive(c, b); },
	">": function (a, b, c) { return convert.toPrimitive(c, a) > convert.toPrimitive(c, b); },
	">=": function (a, b, c) { return convert.toPrimitive(c, a) >= convert.toPrimitive(c, b); },
	"<<": function (a, b, c) { return convert.toPrimitive(c, a) << convert.toPrimitive(c, b); },
	">>": function (a, b, c) { return convert.toPrimitive(c, a) >> convert.toPrimitive(c, b); },
	">>>": function (a, b, c) { return convert.toPrimitive(c, a) >>> convert.toPrimitive(c, b); },
	"%": function (a, b, c) { return convert.toPrimitive(c, a) % convert.toPrimitive(c, b); },
	"|": function (a, b, c) { return convert.toInt32(c, a) | convert.toInt32(c, b); },
	"^": function (a, b, c) { return convert.toInt32(c, a) ^ convert.toInt32(c, b); },
	"&": function (a, b, c) { return convert.toInt32(c, a) & convert.toInt32(c, b); },
	"in": function (a, b, c) {
		a = a.toString();
		if (b.isPrimitive) {
			throw new TypeError("Cannot use 'in' operator to search for '" + a + "' in " + b.toString());
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

module.exports = function BinaryExpression (context) {
	var undef = context.env.global.getProperty("undefined").getValue();
	var left = context.create(context.node.left).execute().result;
	var leftValue = left.getValue() || undef;

	var right = context.create(context.node.right).execute().result;
	var rightValue = right.getValue() || undef;

	var newValue = binaryOperators[context.node.operator](leftValue, rightValue, context);

	return context.result(context.env.objectFactory.createPrimitive(newValue));
};
