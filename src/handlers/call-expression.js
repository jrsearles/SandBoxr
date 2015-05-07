var typeRegistry = require("../types/type-registry");
var FunctionType = require("../types/function-type");

module.exports = function (context) {
	var node = context.node;
	var scope = context.scope;

	var fn = context.create(node.callee).execute();
	if (!fn.result || !(fn.result instanceof FunctionType)) {
		throw new TypeError(fn.result.toString() + " not a function");
	}

	var newScope = scope.createScope(fn.object);

	// todo: handle unassigned parameters, extra arguments passed in
	var args = node.arguments.map(function (arg) { return context.create(arg).execute().result; });
	newScope.setProperty("arguments", args);

	if (fn.result.native) {
		return context.result(fn.result.nativeFunction.apply(context.create(newScope.thisNode, newScope), args));
	}

	// set named parameters
	fn.result.node.params.forEach(function (param, index) {
		newScope.setProperty(param.name, args[index] || typeRegistry.get("UNDEFINED"));
	});

	return context.create(fn.result.node.body, newScope).execute();
};
