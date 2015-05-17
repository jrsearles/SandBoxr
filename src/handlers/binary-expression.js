var objectFactory = require("../types/object-factory");

function implicitEquals (a, b) {
	if (a.isPrimitive && b.isPrimitive) {
		return a.value == b.value;
	}

	if ((a.type === "number" || b.type === "number") || (a.type === "boolean" || b.type === "boolean")) {
		return a.toNumber() === b.toNumber();
	}

	if (a.type === "string" || b.type === "string") {
		return a.toString() === b.toString();
	}

	return a.value == b.value;
}

function not (fn) {
	return function (a, b) {
		return !fn(a, b);
	};
}

/* eslint eqeqeq:0 */
var binaryOperators = {
	"+": function (a, b) { return a.value + b.value; },
	"-": function (a, b) { return a.value - b.value; },
	"/": function (a, b) { return a.value / b.value; },
	"*": function (a, b) { return a.value * b.value; },
	"==": implicitEquals,
	"!=": not(implicitEquals),
	"===": function (a, b) { return a.equals(b); },
	"!==": function (a, b) { return !a.equals(b); },
	"<": function (a, b) { return a.value < b.value; },
	"<=": function (a, b) { return a.value <= b.value; },
	">": function (a, b) { return a.value > b.value; },
	">=": function (a, b) { return a.value >= b.value; },
	"<<": function (a, b) { return a.value << b.value; },
	">>": function (a, b) { return a.value >> b.value; },
	">>>": function (a, b) { return a.value >>> b.value; },
	"%": function (a, b) { return a.value % b.value; },
	"|": function (a, b) { return a.value | b.value; },
	"^": function (a, b) { return a.value ^ b.value; },
	"&": function (a, b) { return a.value & b.value; },
	"in": function (a, b) { return b.hasProperty(a.toString()); },
	"instanceof": function (a, b) {
		var current = a;
		while (current) {
			if (current === b.proto) {
				return true;
			}

			current = current.parent && current.parent.proto;
		}

		return false;
	}
};

module.exports = function BinaryExpression (context) {
	var left = context.create(context.node.left).execute().result;
	var right = context.create(context.node.right).execute().result;
	var newValue = binaryOperators[context.node.operator](left, right);

	return context.result(objectFactory.createPrimitive(newValue));
};
