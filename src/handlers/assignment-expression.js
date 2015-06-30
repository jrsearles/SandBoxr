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
	var right = context.create(context.node.right).execute();

	// check for undeclared global
	if (context.node.left.type === "Identifier" && !context.scope.hasProperty(context.node.left.name)) {
		if (!assignment) {
			throw new ReferenceError(context.node.left.name + " is not defined");
		}

		// not found - add as reference
		context.scope.global.defineOwnProperty(context.node.left.name, context.scope.global.getValue("undefined"), { configurable: true, enumerable: true, writable: true });
	}

	var left = context.create(context.node.left).execute();
	if (!left.reference) {
		throw new ReferenceError("Invalid left-hand side in assignment");
	}

	var newValue;
	if (assignment) {
		newValue = right.result;
	} else {
		newValue = context.scope.global.factory.createPrimitive(assignOperators[context.node.operator](left.result, right.result));
	}

	var obj = left.object || context.scope;
	var name = left.name;

	if (obj.hasProperty(name)) {
		obj.putValue(name, newValue, context.strict, context);
	} else {
		var descriptor = { value: newValue, configurable: true, enumerable: true, writable: true };
		obj.defineOwnProperty(name, null, descriptor, context.strict, context);
	}

	return context.result(newValue, name);
};
