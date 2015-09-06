import {degenerate} from "./async";

export let executeFunction = degenerate(function* (env, fn, params, args, thisArg, callee, isNew) {
	let scope = fn.createScope(env, thisArg, false);
	let returnResult;

	if (isNew) {
		returnResult = thisArg;
	}

	scope.loadArgs(params, args, fn);
	scope.init(fn.node && fn.node.body);

	returnResult = yield scope.use(() => {
		if (fn.native) {
			return fn.nativeFunction.apply(env.createExecutionContext(thisArg, callee, isNew), args) || returnResult;
		}
		
		let executionResult = env.createExecutionContext(fn.node.body, callee, isNew).execute();
		if (executionResult && executionResult.exit && executionResult.result) {
			if (!isNew || !executionResult.result.isPrimitive) {
				return executionResult.result;
			}
		}

		return returnResult;
	});

	return returnResult || env.global.getValue("undefined");
});

export function	getFunctionResult (env, fn, params, args, thisArg, callee) {
	let scope = fn.createScope(env, thisArg, false);
	scope.loadArgs(params, args, fn);
	scope.init(fn.node && fn.node.body);

	return scope.use(() => {
		if (fn.native) {
			return fn.nativeFunction.apply(env.createExecutionContext(thisArg, callee), args);
		}

		return env.createExecutionContext(fn.node.body, callee).execute();
	});
}

export function	tryCallMethod (env, obj, name) {
	let fn = obj.getProperty(name);
	if (!fn) {
		return false;
	}

	fn = fn.getValue();

	if (fn && fn.className === "Function") {
		let undef = env.global.getValue("undefined");
		let scope = fn.createScope(env, obj);
		scope.init(fn.node && fn.node.body);

		let executionResult = scope.use(() => {
			if (fn.native) {
				return fn.nativeFunction.apply(env.createExecutionContext(obj, obj), []);
			}

			scope.loadArgs(fn.node.params, [], fn);

			let result = env.createExecutionContext(fn.node.body, fn.node).execute();
			return result && result.result;
		});

		return executionResult ? executionResult.getValue() : undef;
	}

	return false;
}
