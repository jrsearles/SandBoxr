var Reference = require("../env/reference");

var assignOperators = {
	"+=": function (a, b) { return a.value + b.value; },
	"-=": function (a, b) { return a.value - b.value; },
	"*=": function (a, b) { return a.value * b.value; },
	"/=": function (a, b) { return a.value / b.value; },
	"%=": function (a, b) { return a.value % b.value; },
	"<<=": function (a, b) { return a.value << b.value; },
	">>=": function (a, b) { return a.value >> b.value; },
	">>>=": function (a, b) { return a.value >>> b.value; },
	"|=": function (a, b) { return a.value | b.value; },
	"^=": function (a, b) { return a.value ^ b.value; },
	"&=": function (a, b) { return a.value & b.value; }
};

module.exports = function AssignmentExpression (context) {
	var assignment = context.node.operator === "=";
	var right = context.create(context.node.right).execute().result;

	var left = context.create(context.node.left).execute().result;
	if (!(left instanceof Reference)) {
		throw new ReferenceError("Invalid left-hand side in assignment");
	}

	var newValue;
	if (assignment) {
		newValue = right.getValue();
	} else {
		var rawValue = assignOperators[context.node.operator](left.getValue(), right.getValue());
		newValue = context.env.objectFactory.createPrimitive(rawValue);
	}

	left.putValue(newValue);
	// var obj = left.object || context.env;
	// var name = left.name;


	// if (obj.hasProperty(name)) {
	// 	obj.putValue(name, newValue, context.strict, context);
	// } else {
	// 	var descriptor = { value: newValue, configurable: true, enumerable: true, writable: true };
	// 	obj.defineOwnProperty(name, null, descriptor, context.strict, context);
	// }

	return context.result(newValue);
};
