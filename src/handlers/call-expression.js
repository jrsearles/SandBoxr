var FunctionType = require("../types/function-type");
var objectFactory = require("../types/object-factory");
var utils = require("../utils");

module.exports = function CallExpression (context) {
	var node = context.node;
	var isNew = context.node.type === "NewExpression";
	var returnResult;

	var fn = context.create(node.callee).execute();
	if (!fn.result || !(fn.result instanceof FunctionType)) {
		throw new TypeError(fn.result.toString() + " not a function");
	}

	if (isNew) {
		returnResult = objectFactory.createObject(fn.result);
	}

	var newScope = fn.result.createScope(context.scope, returnResult || fn.object);
	var args = node.arguments.map(function (arg) { return context.create(arg).execute().result; });
	utils.loadArguments(fn.result.native ? [] : fn.result.node.params, args, newScope);

	if (fn.result.native) {
		returnResult = fn.result.nativeFunction.apply(context.create(newScope.thisNode, fn, newScope), args);
	} else {
		var executionResult = context.create(fn.result.node.body, fn.result.node, newScope).execute();

		if (isNew && executionResult && executionResult.exit) {
			returnResult = executionResult.result;
		} else {
			returnResult = returnResult || (executionResult && executionResult.result);
		}
	}

	return context.result(returnResult || context.scope.global.getProperty("undefined"));
};
