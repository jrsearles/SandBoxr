import {PropertyReference} from "../env/property-reference";
import {toString, toObject} from "../utils/native";
import {map} from "../utils/async";
import {UNDEFINED} from "../types/primitive-type";

function assignThis (env, fnMember, fn, isNew, native) {
	if (isNew) {
		return null;
	}

	if (fnMember instanceof PropertyReference && (!fnMember.unqualified || fnMember.base !== env.global)) {
		let thisArg = fnMember.base;
		if (env.options.ecmaVersion === 5) {
			return toObject(env, thisArg);
		}

		return thisArg;
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
		let stringValue = yield toString(fn);
		return context.raise(TypeError(`${stringValue} not a function`));
	}

	let native = fn.native;
	let thisArg = assignThis(context.env, fnMember, fn, isNew, native);
	let callee = fnMember;

	callee.identifier = fn.name;
	let result = yield fn[isNew ? "construct" : "call"](thisArg, args, callee);
	return context.result(result || UNDEFINED);
}
