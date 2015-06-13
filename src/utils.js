var objectFactory = require("./types/object-factory");
var FunctionType = require("./types/function-type");

var util = require("./util");
var utils;

var floor = Math.floor;
var abs = Math.abs;

function sign (value) {
	return value < 0 ? -1 : 1;
}

function getString (executionContext, value) {
	if (!value) {
		return "";
	}

	if (value.isPrimitive || "value" in value) {
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

	if (value.isPrimitive || "value" in value) {
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

	if (thisArg.isPrimitive && thisArg.value != null) {
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
			returnResult = fn.nativeFunction.apply(context.create(newScope.thisNode, callee, newScope, isNew), args) || returnResult;
		} else {
			var executionResult = context.create(fn.node.body, callee, newScope, isNew).execute();
			if (isNew && executionResult && executionResult.exit) {
				returnResult = executionResult.result;
			} else {
				returnResult = returnResult || (executionResult && executionResult.result);
			}
		}

		return returnResult || context.scope.global.getProperty("undefined");
	},

	wrapNative: function (fn) {
		var nativeFunction = function () {
			if (this.isNew) {
				throw new TypeError(fn.name + " is not a constructor.");
			}

			var scope = this && this.node && this.node.value;
			var args = getValues(this, arguments);

			var value = fn.apply(scope, args);
			return objectFactory.createPrimitive(value);
		};

		nativeFunction.nativeLength = fn.length;
		return nativeFunction;
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
				return executionResult ? executionResult.result : scope.global.getProperty("undefined");
			}
		}

		return null;
	},

	createWrappedPrimitive: function (source, value) {
		var type = util.getType(value);
		var ctor = objectFactory.scope.properties[type];
		source.properties.constructor = ctor;
		// source.setProperty("constructor", ctor);

		source.value = value;
		source.className = type;
		source.toString = function () { return String(value); };
		source.toNumber = function () { return Number(value); };
		source.toBoolean = function () { return Boolean(value); };
		source.valueOf = function () { return value; };
		return source;
	},

	toPrimitive: function (executionContext, obj, preferredType) {
		preferredType = preferredType && preferredType.toLowerCase();

		if (preferredType === "string") {
			return getString(executionContext, obj);
		}

		// default case/number
		return getPrimitive(executionContext, obj);
	},

	toNumber: function (executionContext, obj) {
		return Number(this.toPrimitive(executionContext, obj, "number"));
	},

	toInteger: function (executionContext, obj) {
		var value = this.toNumber(executionContext, obj);
		if (isNaN(value)) {
			return 0;
		}

		if (value === 0 || !isFinite(value)) {
			return value;
		}

		return sign(value) * floor(abs(value));
	},

	toInt32: function (executionContext, obj) {
		var value = this.toNumber(executionContext, obj);
		if (value === 0 || isNaN(value) || !isFinite(value)) {
			return 0;
		}

		return sign(value) * floor(abs(value));
	},

	toUInt32: function (executionContext, obj) {
		var value = this.toInt32(executionContext, obj);
		return value >>> 0;
	}
};

module.exports = utils;
