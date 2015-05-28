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
	// check for undeclared global
	if (context.node.left.type === "Identifier" && !context.scope.hasProperty(context.node.left.name)) {
		// not found - add as reference
		context.scope.global.setProperty(context.node.left.name, context.scope.global.getProperty("undefined"), { configurable: true });
	}

	var left = context.create(context.node.left).execute();
	var right = context.create(context.node.right).execute();
	var newValue;

	if (context.node.operator === "=") {
		newValue = right.result;
	} else {
		newValue = objectFactory.createPrimitive(assignOperators[context.node.operator](left.result, right.result));
	}

	var obj = left.object || context.scope;
	var name = left.name;

	if (obj.hasProperty(name)) {
		obj.setProperty(name, newValue);
	} else {
		obj.setProperty(name, newValue, { configurable: true });
	}

	return context.result(newValue, name);
};
