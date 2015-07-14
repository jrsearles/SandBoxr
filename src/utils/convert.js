var func = require("./func");

var floor = Math.floor;
var abs = Math.abs;

function sign (value) {
	return value < 0 ? -1 : 1;
}

function getString (executionContext, value) {
	if (!value) {
		return "undefined";
	}

	if (value.isPrimitive /*|| "value" in value*/) {
		return value.toString();
	}

	var primitiveValue = func.callMethod(value, "toString", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.toString();
	}

	primitiveValue = func.callMethod(value, "valueOf", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.toString();
	}

	throw new TypeError("Cannot convert object to primitive value.");
}

function getPrimitive (executionContext, value) {
	if (!value) {
		return 0;
	}

	if (value.isPrimitive /*|| "value" in value*/) {
		return value.value;
	}

	var primitiveValue = func.callMethod(value, "valueOf", [], executionContext);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.valueOf();
	}

	primitiveValue = func.callMethod(value, "toString", [], executionContext);
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

module.exports = {
	primitiveToObject: function (value, factory) {
		var newValue = factory.createPrimitive(value);
		newValue.isPrimitive = false;
		newValue.type = "object";
		newValue.toBoolean = function () { return true; };
		return newValue;
	},

	toObject: function (obj, factory) {
		if (obj.isPrimitive && obj.value != null && obj.type !== "object") {
			return this.primitiveToObject(obj.value, factory);
		}

		return obj;
	},

	toArray: function (obj, length) {
		var arr = [];

		if (obj) {
			var ln = length >= 0 ? length : obj.getProperty("length").getValue().value;
			var i = 0;

			while (i < ln) {
				if (obj.hasProperty(i)) {
					arr[i] = obj.getProperty(i).getValue();
				}

				i++;
			}
		}

		return arr;
	}, 

	toPrimitive: function (executionContext, obj, preferredType) {
		preferredType = preferredType && preferredType.toLowerCase();
		if (!preferredType && obj) {
			preferredType = obj.primitiveHint;
		}

		if (preferredType === "string") {
			return getString(executionContext, obj);
		}

		// default case/number
		return getPrimitive(executionContext, obj);
	},

	toString: function (executionContext, obj) {
		return String(this.toPrimitive(executionContext, obj, "string"));
	},

	toNumber: function (executionContext, obj) {
		if (!obj || obj.type === "undefined") {
			return NaN;
		}

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
	},

	toNativeFunction: function (factory, fn, name) {
		return factory.createBuiltInFunction(function () {
			var scope = this && this.node && this.node.value;
			var args = getValues(this, arguments);

			var value = fn.apply(scope, args);
			return factory.createPrimitive(value);
		}, fn.length, name);
	}
};
