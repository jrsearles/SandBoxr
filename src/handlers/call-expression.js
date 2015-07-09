var FunctionType = require("../types/function-type");
var Reference = require("../env/reference");
var func = require("../utils/func");

module.exports = function CallExpression (context) {
	var node = context.node;
	var isNew = context.node.type === "NewExpression";

	var fnMember = context.create(node.callee).execute().result;
	var fn = fnMember.getValue();
	var args = node.arguments.map(function (arg) { return context.create(arg).execute().result.getValue(); });

	if (!(fn instanceof FunctionType)) {
		throw new TypeError(fn.toString() + " not a function");
	}

	var native = fn.native;
	var thisArg;

	if (isNew && !native) {
		thisArg = context.env.objectFactory.createObject(fn);
	}

	if (!isNew && fnMember instanceof Reference) {
		if (fnMember.isPropertyReference) {
			thisArg = fnMember.base;
		} else {
			// thisArg = fnMember.base.getThisValue();
		}
	}

	var params = native ? [] : fn.node.params;
	var callee = native ? fnMember : fn.node;

	return context.result(func.executeFunction(context, fn, params, args, thisArg, callee, isNew));
};
