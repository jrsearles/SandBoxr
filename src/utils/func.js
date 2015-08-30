import * as contracts from "./contracts";
import {degenerate} from "./async";

export let executeFunction = degenerate(function* (env, fn, params, args, thisArg, callee, isNew) {
	var scope = fn.createScope(env, thisArg, false);
	var returnResult;

	if (isNew) {
		returnResult = thisArg;
	}

	loadArguments(env, params, args, fn);
	scope.init();
	
	try {
		if (fn.native) {
			returnResult = yield fn.nativeFunction.apply(env.createExecutionContext(thisArg, callee, isNew), args) || returnResult;
		} else {
			var executionResult = env.createExecutionContext(fn.node.body, callee, isNew).execute();
			if (executionResult && executionResult.exit && executionResult.result) {
				if (!isNew || !executionResult.result.isPrimitive) {
					returnResult = executionResult.result;
				}
			}
		}
	} catch (err) {
		scope.exitScope();
		throw err;
	}

	scope.exitScope();
	return returnResult || env.global.getValue("undefined");
});

export function	getFunctionResult (env, fn, params, args, thisArg, callee) {
	var scope = fn.createScope(env, thisArg, false);
	loadArguments(env, params, args, fn);
	scope.init();
	
	var executionResult;
	try {
		if (fn.native) {
			executionResult = fn.nativeFunction.apply(env.createExecutionContext(thisArg, callee), args);
		} else {
			executionResult = env.createExecutionContext(fn.node.body, callee).execute();
		}
	} catch (err) {
		scope.exitScope();
		throw err;
	}

	scope.exitScope();
	return executionResult;
}

export function	loadArguments (env, params, args, callee) {
	var undef = env.global.getValue("undefined");
	let strict = env.isStrict() || callee.isStrict();
	
	var argumentList = env.objectFactory.createArguments(args, callee, strict);
	env.current.createVariable("arguments");
	env.current.putValue("arguments", argumentList);

	params.forEach(function (param, index) {
		contracts.assertIsValidParameterName(param.name, strict);
		
		if (!callee.isStrict() && !env.current.hasProperty(param.name)) {
			var descriptor = env.current.createVariable(param.name);
			if (args.length > index) {
				argumentList.mapProperty(index, descriptor);
			}
		}

		env.current.putValue(param.name, args[index] || undef);
	});

	// just set value if additional, unnamed arguments are passed in
	var length = args.length;
	let i = callee.isStrict() ? 0 : params.length;
	for (; i < length; i++) {
		argumentList.defineOwnProperty(i, {
			value: args[i],
			configurable: true,
			enumerable: true,
			writable: true
		});
	}

	argumentList.defineOwnProperty("length", {
		value: env.objectFactory.createPrimitive(length),
		configurable: true,
		enumerable: false,
		writable: true
	});
}

export function	tryCallMethod (env, obj, name) {
	var fn = obj.getProperty(name);
	if (!fn) {
		return false;
	}

	fn = fn.getValue();
	var undef = env.global.getValue("undefined");

	if (fn && fn.className === "Function") {
		var scope = fn.createScope(env, obj);
		scope.init();
		var executionResult;

		try {
			if (fn.native) {
				executionResult = fn.nativeFunction.apply(env.createExecutionContext(obj, obj), []);
			} else {
				loadArguments(env, fn.node.params, [], fn);

				executionResult = env.createExecutionContext(fn.node.body, fn.node).execute();
				executionResult = executionResult && executionResult.result;
			}
		} catch (err) {
			scope.exitScope();
			throw err;
		}

		scope.exitScope();
		return executionResult ? executionResult.getValue() : undef;
	}

	return false;
}
