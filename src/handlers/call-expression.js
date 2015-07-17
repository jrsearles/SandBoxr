var FunctionType = require("../types/function-type");
var Reference = require("../env/reference");
var func = require("../utils/func");
var convert = require("../utils/convert");

function assignThis (env, fnMember, fn, isNew, native) {
	if (isNew) {
		// if this is a native contructor we don't are about this
		// otherwise create a new object
		return native ? null : env.objectFactory.createObject(fn);
	}

	if (fnMember instanceof Reference && fnMember.isPropertyReference) {
		return convert.toObject(env, fnMember.base);
	}

	return env.global;
}

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
	var thisArg = assignThis(context.env, fnMember, fn, isNew, native);
	var params = native ? [] : fn.node.params;
	var callee = fnMember;

	callee.identifier = fn.name;
	return context.result(func.executeFunction(context, fn, params, args, thisArg, callee, isNew));
};
