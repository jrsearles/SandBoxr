var FunctionType = require("../types/function-type");
var func = require("../utils/func");

module.exports = function CallExpression (context) {
	var node = context.node;
	var isNew = context.node.type === "NewExpression";
	var returnResult;

	var fn = context.create(node.callee).execute();
	var args = node.arguments.map(function (arg) { return context.create(arg).execute().result; });

	if (!fn.result || !(fn.result instanceof FunctionType)) {
		throw new TypeError(fn.result.toString() + " not a function");
	}

	var native = fn.result.native;

	if (isNew && !native) {
		returnResult = context.scope.global.factory.createObject(fn.result);
	}

	var params = native ? [] : fn.result.node.params;
	var thisArg = returnResult || fn.object;
	var callee = native ? fn : fn.result.node;

	return context.result(func.executeFunction(context, fn.result, params, args, thisArg, callee, isNew));
};
