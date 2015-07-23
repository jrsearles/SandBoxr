module.exports = {
	executeFunction: function (context, fn, params, args, thisArg, callee, isNew) {
		var scope = fn.createScope(context.env, thisArg, false);
		var returnResult;

		if (isNew) {
			returnResult = thisArg;
		}

		this.loadArguments(context.env, params, args, fn);

		try {
			if (fn.native) {
				returnResult = fn.nativeFunction.apply(context.create(thisArg, callee, isNew), args) || returnResult;
			} else {
				var executionResult = context.create(fn.node.body, callee, isNew).execute();
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
		return returnResult || context.env.global.getProperty("undefined").getValue();
	},

	getFunctionResult: function (context, fn, params, args, thisArg, callee) {
		var scope = fn.createScope(context.env, thisArg, false);
		this.loadArguments(context.env, params, args, fn);

		var executionResult;
		try {
			if (fn.native) {
				executionResult = fn.nativeFunction.apply(context.create(thisArg, callee, false), args);
			} else {
				executionResult = context.create(fn.node.body, callee, false).execute();
			}
		} catch (err) {
			scope.exitScope();
			throw err;
		}

		scope.exitScope();
		return executionResult;
	},

	loadArguments: function (env, params, args, callee) {
		var undef = env.global.getProperty("undefined").getValue();

		var argumentList = env.objectFactory.createArguments(args, callee);
		env.current.createVariable("arguments");
		env.current.putValue("arguments", argumentList);

		params.forEach(function (param, index) {
			if (!env.current.hasVariable(param.name)) {
				var descriptor = env.current.createVariable(param.name);
				if (args.length > index) {
					argumentList.mapProperty(index, descriptor);
				}
			}

			env.current.putValue(param.name, args[index] || undef);
		});

		// just set value if additional, unnamed arguments are passed in
		var length = args.length;
		for (var i = params.length; i < length; i++) {
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
	},

	tryCallMethod: function (env, obj, name) {
		var fn = obj.getProperty(name);
		if (!fn) {
			return false;
		}

		fn = fn.getValue();
		var undef = env.global.getProperty("undefined").getValue();

		if (fn && fn.className === "Function") {
			var scope = fn.createScope(env, obj);
			var executionResult;

			try {
				if (fn.native) {
					executionResult = fn.nativeFunction.apply(env.createExecutionContext(obj, obj), []);
				} else {
					this.loadArguments(env, fn.node.params, []);

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
};
