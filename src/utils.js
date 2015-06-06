var objectFactory = require("./types/object-factory");
var FunctionType = require("./types/function-type");
var util = require("./util");

var utils;

function getString (executionContext, value) {
	if (!value) {
		return "";
	}

	if (value.isPrimitive || value.value !== undefined) {
		return value.toString();
	}

	var primitiveValue = utils.callMethod(value, "toString", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.toString();
	}

	primitiveValue = utils.callMethod(value, "valueOf", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.toString();
	}

	throw new TypeError("Cannot convert object to primitive value.");
}

function getPrimitive (executionContext, value) {
	if (!value) {
		return 0;
	}

	if (value.isPrimitive || value.value !== undefined) {
		return value.value;
	}

	var primitiveValue = utils.callMethod(value, "valueOf", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.valueOf();
	}

	primitiveValue = utils.callMethod(value, "toString", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.valueOf();
	}

	throw new TypeError("Cannot convert object to primitive");
}

function getValues (executionContext, args) {
	var i = 0;
	var ln = args.length;
	var values = [];

	for (; i < ln; i++) {
		values.push(getPrimitive(executionContext, args[i]));
	}

	return values;
}

function defineThis (scope, thisArg, isNew) {
	if (!thisArg) {
		return scope.global;
	}

	if (isNew) {
		return thisArg;
	}

	if (thisArg.isPrimitive) {
		if (thisArg.value == null) {
			return scope.global;
		}

		// call toObject on primitive 10.4.3
		var obj = objectFactory.createObject();
		return utils.createWrappedPrimitive(obj, thisArg.value);
	}

	return thisArg;
}

utils = {
	executeFunction: function (context, fn, params, args, thisArg, callee, isNew) {
		thisArg = defineThis(context.scope, thisArg, isNew);
		var newScope = fn.createScope(context.scope, thisArg);
		var returnResult;

		if (isNew) {
			returnResult = thisArg;
		}

		this.loadArguments(params, args, newScope, fn);

		if (fn.native) {
			returnResult = fn.nativeFunction.apply(context.create(newScope.thisNode, callee, newScope), args);
		} else {
			var executionResult = context.create(fn.node.body, callee, newScope).execute();
			if (isNew && executionResult && executionResult.exit) {
				returnResult = executionResult.result;
			} else {
				returnResult = returnResult || (executionResult && executionResult.result);
			}
		}

		return returnResult || context.scope.global.getProperty("undefined");
	},

	wrapNative: function (fn) {
		return function () {
			var scope = this && this.node && this.node.value;
			var args = getValues(this, arguments);

			var value = fn.apply(scope, args);
			return objectFactory.createPrimitive(value);
		};
	},

	loadArguments: function (params, args, scope, callee) {
		var undef = scope.global.getProperty("undefined");
		var argumentList = objectFactory.createArguments(args);
		scope.defineProperty("arguments", argumentList);

		params.forEach(function (param, index) {
			var ref = argumentList.createReference(index);
			scope.defineProperty(param.name, ref || undef);
		});
	},

	callMethod: function (obj, name, args, executionContext) {
		var method = obj.getProperty(name);

		if (method && method instanceof FunctionType) {
			var scope = executionContext.scope.createScope(obj);

			if (method.native) {
				return method.nativeFunction.apply(executionContext.create(obj, obj, scope), args);
			} else {
				this.loadArguments(method.node.params, args, scope);

				var executionResult = executionContext.create(method.node.body, method.node, scope).execute();
				return executionResult && executionResult.result;
			}
		}

		return null;
	},

	createWrappedPrimitive: function (source, value) {
		var ctor = objectFactory.scope.getProperty(util.getType(value));
		// source.properties.constructor = ctor;
		source.setProperty("constructor", ctor);

		source.value = value;
		source.toString = function () { return String(value); };
		source.toNumber = function () { return Number(value); };
		source.toBoolean = function () { return Boolean(value); };
		source.valueOf = function () { return value; };
		return source;
	},

	toPrimitive: function (executionContext, obj, preferredType) {
		preferredType = preferredType && preferredType.toLowerCase();

		if (preferredType === "string") {
			if (!obj) {
				return "";
			}

			if (obj.isPrimitive) {
				return obj.toString();
			}

			return getString(executionContext, obj);
		}

		// default case - number
		if (!obj) {
			return 0;
		}

		if (obj.isPrimitive) {
			return obj.value;
		}

		return getPrimitive(executionContext, obj);
	}
};

module.exports = utils;
