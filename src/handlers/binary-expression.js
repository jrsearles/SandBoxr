var objectFactory = require("../types/object-factory");

/* eslint eqeqeq:0 */
// todo: implement instanceof, in
var binaryOperators = {
	"+": function (a, b) { return a.value + b.value; },
	"-": function (a, b) { return a.value - b.value; },
	"/": function (a, b) { return a.value / b.value; },
	"*": function (a, b) { return a.value * b.value; },
	"==": function (a, b) { return a.value == b.value; },
	"!=": function (a, b) { return a.value != b.value; },
	"===": function (a, b) { return a.value === b.value; },
	"!==": function (a, b) { return a.value !== b.value; },
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
	"in": function (a, b) { return b.hasProperty(a.value); }
};

module.exports = function (context) {
	var left = context.create(context.node.left).execute().result;
	var right = context.create(context.node.right).execute().result;
	var newValue = binaryOperators[context.node.operator](left, right);

	return context.result(objectFactory.createPrimitive(newValue));
};
