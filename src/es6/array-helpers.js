import {UNDEFINED} from "../types/primitive-type";

export function normalizeIndex (index, length) {
	if (index < 0) {
		return Math.max(length + index, 0);
	}

	return Math.min(index, length);
}

export function* executeCallback (env, callback, entry, thisArg, arr) {
	if (!thisArg) {
		thisArg = callback.isStrict() ? UNDEFINED : env.global;
	}

	let scope = env.createExecutionScope(callback, thisArg);
	scope.init(callback.node.body);

	let args = [entry.value, env.objectFactory.createPrimitive(entry.key), arr];
	return yield callback.call(thisArg, args) || UNDEFINED;

	// yield scope.loadArgs(callback.node.params, args, callback);

	// return yield scope.use(function* () {
	// 	let executionResult = yield env.createExecutionContext(callback.node.body, callback.node).execute();
	// 	if (executionResult && executionResult.exit) {
	// 		return executionResult.result || UNDEFINED;
	// 	}

	// 	return UNDEFINED;
	// });
}