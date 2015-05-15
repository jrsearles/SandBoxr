var FunctionType = require("../types/function-type");
var objectFactory = require("../types/object-factory");
var typeRegistry = require("../types/type-registry");
var utils = require("../utils");

module.exports = function CallExpression (context) {
	var node = context.node;
	var isNew = context.node.type === "NewExpression";
	var newObj, executionResult;

	var fn = context.create(node.callee).execute();
	if (!fn.result || !(fn.result instanceof FunctionType)) {
		throw new TypeError(fn.result.toString() + " not a function");
	}

	if (isNew && !fn.result.native) {
		newObj = objectFactory.createObject(fn.result);
	}

	var newScope = fn.result.createScope(context.scope, newObj || fn.object);
	var args = node.arguments.map(function (arg) { return context.create(arg).execute().result; });
	utils.loadArguments(fn.result.native ? [] : fn.result.node.params, args, newScope);

	if (fn.result.native) {
		executionResult = fn.result.nativeFunction.apply(context.create(newScope.thisNode, newScope.thisNode, newScope), args);
	} else {
		executionResult = context.create(fn.result.node.body, fn.result.node, newScope).execute();
		executionResult = executionResult && executionResult.result;
	}

	return context.result(newObj || executionResult || typeRegistry.get("undefined"));
};
