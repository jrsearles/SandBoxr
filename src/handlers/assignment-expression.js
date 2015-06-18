var objectFactory = require("../types/object-factory");

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

	// check for undeclared global
	if (context.node.left.type === "Identifier" && !context.scope.hasProperty(context.node.left.name)) {
		if (!assignment) {
			throw new ReferenceError(context.node.left.name + " is not defined");
		}

		// not found - add as reference
		context.scope.global.putValue(context.node.left.name, context.scope.global.getValue("undefined"), { configurable: true });
	}

	var left = context.create(context.node.left).execute();
	if (!left.reference) {
		throw new ReferenceError("Invalid left-hand side in assignment");
	}

	var right = context.create(context.node.right).execute();
	var newValue;

	if (assignment) {
		newValue = right.result;
	} else {
		newValue = objectFactory.createPrimitive(assignOperators[context.node.operator](left.result, right.result));
	}

	var obj = left.object || context.scope;
	var name = left.name;

	if (obj.hasProperty(name)) {
		obj.putValue(name, newValue);
	} else {
		obj.putValue(name, newValue, { configurable: left.object ? true : false });
	}

	return context.result(newValue, name);
};
