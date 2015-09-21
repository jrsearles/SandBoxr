import {PropertyReference} from "../env/property-reference";
import {toString,toObject} from "../utils/native";
import {execute as exec} from "../utils/func";
import {map} from "../utils/async";

function assignThis (env, fnMember, fn, isNew, native) {
	if (isNew) {
		// if this is a native contructor we don't care about this
		// otherwise create a new object
		return native ? null : env.objectFactory.createObject(fn);
	}

	if (fnMember instanceof PropertyReference && (!fnMember.unqualified || fnMember.base !== env.global)) {
		return toObject(env, fnMember.base);
	}

	return null;
}

export default function* CallExpression (context) {
	let node = context.node;
	let isNew = context.node.type === "NewExpression";

	let fnMember = (yield context.create(node.callee).execute()).result;
	let fn = fnMember.getValue();

	let args = yield* map(node.arguments, function* (arg) {
		return (yield context.create(arg).execute()).result.getValue();
	});

	if (!fn || fn.className !== "Function") {
		let stringValue = yield toString(context.env, fn);
		return context.raise(new TypeError(`${stringValue} not a function`));
	}

	let native = fn.native;
	let thisArg = assignThis(context.env, fnMember, fn, isNew, native);
	let params = native ? [] : fn.node.params;
	let callee = fnMember;

	callee.identifier = fn.name;
	return context.result(yield exec(context.env, fn, params, args, thisArg, callee, isNew));
}
