var objectFactory = require("../types/object-factory");
var utils = require("../utils");

function implicitEquals (a, b, context) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value == b.value;
	}

	if (a.type === "object" && b.type === "object") {
		return a === b;
	}

	var primitiveA = utils.toPrimitive(context, a);
	var primitiveB = utils.toPrimitive(context, b);

	if ((typeof primitiveA === "number" || typeof primitiveB === "number") || (typeof primitiveA === "boolean" || typeof primitiveB === "boolean")) {
		return Number(primitiveA) === Number(primitiveB);
	}

	if (typeof primitiveA === "string") {
		return primitiveA === utils.toPrimitive(context, b, "string");
	}

	if (typeof primitiveB === "string") {
		return utils.toPrimitive(context, a, "string") === primitiveB;
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

	a = utils.toPrimitive(context, a);
	b = utils.toPrimitive(context, b);
	return a + b;
}

function toNumber (context, obj) {
	if (obj.className === "Number") {
		return obj.toNumber();
	}

	return utils.toPrimitive(context, obj, "number");
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
	"<": function (a, b, c) { return utils.toPrimitive(c, a) < utils.toPrimitive(c, b); },
	"<=": function (a, b, c) { return utils.toPrimitive(c, a) <= utils.toPrimitive(c, b); },
	">": function (a, b, c) { return utils.toPrimitive(c, a) > utils.toPrimitive(c, b); },
	">=": function (a, b, c) { return utils.toPrimitive(c, a) >= utils.toPrimitive(c, b); },
	"<<": function (a, b, c) { return utils.toPrimitive(c, a) << utils.toPrimitive(c, b); },
	">>": function (a, b, c) { return utils.toPrimitive(c, a) >> utils.toPrimitive(c, b); },
	">>>": function (a, b, c) { return utils.toPrimitive(c, a) >>> utils.toPrimitive(c, b); },
	"%": function (a, b, c) { return utils.toPrimitive(c, a) % utils.toPrimitive(c, b); },
	"|": function (a, b, c) { return utils.toInt32(c, a) | utils.toInt32(c, b); },
	"^": function (a, b, c) { return utils.toInt32(c, a) ^ utils.toInt32(c, b); },
	"&": function (a, b, c) { return utils.toInt32(c, a) & utils.toInt32(c, b); },
	"in": function (a, b, c) { return b.hasProperty(a.toString()); },
	"instanceof": function (a, b) {
		if (b.type !== "function") {
			throw new TypeError("Expecting a function in instanceof check, but got " + b.type);
		}

		if (a.isPrimitive) {
			return false;
		}

		var visited = [];
		var current = a;
		while (current) {
			if (visited.indexOf(current) >= 0) {
				return false;
			}

			// keep a stack to avoid circular reference
			visited.push(current);
			if (current === b.proto) {
				return true;
			}

			current = current.proto;
		}

		return false;
	}
};

module.exports = function BinaryExpression (context) {
	var left = context.create(context.node.left).execute().result;
	var right = context.create(context.node.right).execute().result;
	var newValue = binaryOperators[context.node.operator](left, right, context);

	return context.result(objectFactory.createPrimitive(newValue));
};
