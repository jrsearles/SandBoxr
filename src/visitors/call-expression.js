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

export default function* CallExpression (node, context, next) {
	let isNew = node.isNewExpression();
	let fnMember = (yield next(node.callee, context)).result;
	let fn = fnMember.getValue();

	let args = yield* map(node.arguments, function* (arg) {
		return (yield next(arg, context)).result.getValue();
	});

	if (!fn || fn.className !== "Function") {
		let stringValue = yield toString(fn);
		throw TypeError(`${stringValue} not a function`);
	}

	let native = fn.native;
	let thisArg = assignThis(context.env, fnMember, fn, isNew, native);
	let callee = fnMember;

	callee.identifier = fn.name;
	let result = yield fn[isNew ? "construct" : "call"](thisArg, args, callee);
	return context.result(result || UNDEFINED);
}
