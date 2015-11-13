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
