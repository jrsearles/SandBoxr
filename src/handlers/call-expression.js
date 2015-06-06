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

	var native = fn.result.native;
	var params = native ? [] : fn.result.node.params;
	var args = node.arguments.map(function (arg) { return context.create(arg).execute().result; });
	var thisArg = returnResult || fn.object;
	var callee = native ? fn : fn.result.node;

	return context.result(utils.executeFunction(context, fn.result, params, args, thisArg, callee, isNew));
};
