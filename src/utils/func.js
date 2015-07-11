function defineThis (scope, thisArg, isNew) {
	if (!thisArg) {
		return scope.global;
	}

	if (isNew) {
		return thisArg;
	}

	if (thisArg.isPrimitive && thisArg.value != null) {
		// call toObject on primitive 10.4.3
		var obj = scope.objectFactory.createPrimitive(thisArg.value);
		obj.isPrimitive = false;
		obj.type = "object";
		obj.toBoolean = function () { return true; };
		return obj;
	}

	return thisArg;
}

function createArgumentProperty (scope, name) {
	return {
		configurable: true,
		enumerable: true,
		get: undefined,
		getter: function () {
			return scope.getBindingValue(name);
			// return arg.getValue(scope);
		},
		set: undefined,
		setter: function (value) {
			scope.setMutableBinding(name, value);
			// arg.setValue(scope, value);
		},
		writable: true
	};
}

module.exports = {
	executeFunction: function (context, fn, params, args, thisArg, callee, isNew) {
		thisArg = defineThis(context.env, thisArg, isNew);
		var scope = fn.createScope(context.env, thisArg, false);
		var returnResult;

		if (isNew) {
			returnResult = thisArg;
		}

		this.loadArguments(params, args, context.env, fn);

		try {
			if (fn.native) {
				returnResult = fn.nativeFunction.apply(context.create(thisArg, callee, isNew), args) || returnResult;
			} else {
				var executionResult = context.create(fn.node.body, callee, isNew).execute();
				if (isNew && executionResult && executionResult.exit && executionResult.result && !executionResult.result.isPrimitive) {
					returnResult = executionResult.result;
				} else {
					returnResult = returnResult || (executionResult && executionResult.result);
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
		thisArg = defineThis(context.env, thisArg);
		var scope = fn.createScope(context.env, thisArg, false);

		this.loadArguments(params, args, context.env, fn);

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

	loadArguments: function (params, args, env, callee) {
		var undef = env.global.getProperty("undefined").getValue();

		var argumentList = env.objectFactory.createArguments(args, callee);
		env.current.createMutableBinding("arguments");
		env.current.setMutableBinding("arguments", argumentList);

		params.forEach(function (param, index) {
			if (!env.current.hasBinding(param.name)) {
				env.current.createMutableBinding(param.name);
			}

			var argValue = args[index];
			env.current.setMutableBinding(param.name, argValue || undef);
			argumentList.defineOwnProperty(index, createArgumentProperty(env.current, param.name), false);
			// if (argumentList.hasProperty(index)) {
			// 	env.current.setMutableBinding(param.name, argumentList.getProperty(index).getValue() || undef);
			// } else {
			// 	env.current.setMutableBinding(param.name, undef);
			// }
		});

		// just set value if additional, unnamed arguments are passed in
		var ln = args.length;
		for (var i = params.length; i < ln; i++) {
			argumentList.defineOwnProperty(i, { value: args[i], configurable: true, enumerable: true, writable: true });
		}

		argumentList.defineOwnProperty("length", {
			value: env.objectFactory.createPrimitive(ln),
			configurable: true,
			enumerable: false,
			writable: true
		});
	},

	callMethod: function (obj, name, args, executionContext) {
		var fn = obj.getProperty(name).getValue();
		var undef = executionContext.env.global.getProperty("undefined").getValue();

		if (fn && fn.className === "Function") {
			var scope = fn.createScope(executionContext.env, obj);
			var executionResult;

			try {
				if (fn.native) {
					executionResult = fn.nativeFunction.apply(executionContext.create(obj, obj), args);
				} else {
					this.loadArguments(fn.node.params, args, executionContext.env);

					executionResult = executionContext.create(fn.node.body, fn.node).execute();
					executionResult = executionResult && executionResult.result;
				}
			} catch (err) {
				scope.exitScope();
				throw err;
			}

			scope.exitScope();
			return executionResult ? executionResult.getValue() : undef;
		}

		return null;
	}
};
