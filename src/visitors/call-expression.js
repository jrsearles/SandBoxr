import PropertyReference from "../env/property-reference";
import * as convert from "../utils/convert";
import * as func from "../utils/func";
import {degenerate} from "../utils/async";

function assignThis (env, fnMember, fn, isNew, native) {
	if (isNew) {
		// if this is a native contructor we don't are about this
		// otherwise create a new object
		return native ? null : env.objectFactory.createObject(fn);
	}
	
	if (fnMember instanceof PropertyReference && fnMember.base !== env.global) {
		return convert.toObject(env, fnMember.base);
	}
	
	return null;
}

export default degenerate(function* CallExpression (context) {
	var node = context.node;
	var isNew = context.node.type === "NewExpression";
	
	var fnMember = (yield context.create(node.callee).execute()).result;
	var fn = fnMember.getValue();
	var args = [];
	for (let arg of node.arguments) {
		args.push((yield context.create(arg).execute()).result.getValue());
	}
	
	if (!fn || fn.className !== "Function") {
		throw new TypeError(convert.toString(context.env, fn) + " not a function");
	}
	
	var native = fn.native;
	var thisArg = assignThis(context.env, fnMember, fn, isNew, native);
	var params = native ? [] : fn.node.params;
	var callee = fnMember;
	
	callee.identifier = fn.name;
	return context.result(yield func.executeFunction(context.env, fn, params, args, thisArg, callee, isNew));
});
