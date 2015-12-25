import {UNDEFINED} from "../types/primitive-type";

export function* tryExecute (obj, name, args = []) {
	let fn = obj.getProperty(name);
	if (!fn) {
		return false;
	}

	fn = fn.getValue();

	if (fn && fn.className === "Function") {
		let executionResult = yield fn.call(obj, args, fn);
		return executionResult ? executionResult.getValue() : UNDEFINED;
	}

	return false;
}

export function getMethod (obj, key) {
	let propInfo = obj.getProperty(key);
	if (!propInfo) {
		return null;
	}

	let method = propInfo.getValue();
	if (method.type !== "function") {
		throw TypeError(`${key} is not a method`);
	}

	return method;
}
