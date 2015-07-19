var func = require("./func");

var floor = Math.floor;
var abs = Math.abs;

function sign (value) {
	return value < 0 ? -1 : 1;
}

function getString (env, value) {
	if (!value) {
		return "undefined";
	}

	if (value.isPrimitive) {
		return String(value.value);
	}

	var primitiveValue = func.callMethod(env, value, "toString", []);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return String(primitiveValue.value);
	}

	primitiveValue = func.callMethod(env, value, "valueOf", []);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return String(primitiveValue.value);
	}

	throw new TypeError("Cannot convert object to primitive value.");
}

function getPrimitive (env, value) {
	if (!value) {
		return 0;
	}

	if (value.isPrimitive) {
		return value.value;
	}

	var primitiveValue = func.callMethod(env, value, "valueOf", []);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.value;
	}

	primitiveValue = func.callMethod(env, value, "toString", []);
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.value;
	}

	throw new TypeError("Cannot convert object to primitive");
}


function getValues (env, args) {
	var i = 0;
	var ln = args.length;
	var values = [];

	for (; i < ln; i++) {
		values.push(getPrimitive(env, args[i]));
	}

	return values;
}

module.exports = {
	primitiveToObject: function (env, value) {
		var newValue = env.objectFactory.createPrimitive(value);
		newValue.isPrimitive = false;
		newValue.type = "object";
		newValue.toBoolean = function () { return true; };
		return newValue;
	},

	toObject: function (env, obj) {
		if (obj.isPrimitive && obj.value != null && obj.type !== "object") {
			return this.primitiveToObject(env, obj.value);
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

	toPrimitive: function (env, obj, preferredType) {
		preferredType = preferredType && preferredType.toLowerCase();
		if (!preferredType && obj) {
			preferredType = obj.primitiveHint;
		}

		if (preferredType === "string") {
			return getString(env, obj);
		}

		// default case/number
		return getPrimitive(env, obj);
	},

	toString: function (env, obj) {
		return String(this.toPrimitive(env, obj, "string"));
	},

	toNumber: function (env, obj) {
		if (!obj || obj.type === "undefined") {
			return NaN;
		}

		return Number(this.toPrimitive(env, obj, "number"));
	},

	toInteger: function (env, obj) {
		var value = this.toNumber(env, obj);
		if (isNaN(value)) {
			return 0;
		}

		if (value === 0 || !isFinite(value)) {
			return value;
		}

		return sign(value) * floor(abs(value));
	},

	toInt32: function (env, obj) {
		var value = this.toNumber(env, obj);
		if (value === 0 || isNaN(value) || !isFinite(value)) {
			return 0;
		}

		return sign(value) * floor(abs(value));
	},

	toUInt32: function (env, obj) {
		var value = this.toInt32(env, obj);
		return value >>> 0;
	},

	toNativeFunction: function (env, fn, name) {
		return env.objectFactory.createBuiltInFunction(function () {
			var scope = this && this.node && this.node.value;
			var args = getValues(env, arguments);

			var value = fn.apply(scope, args);
			return env.objectFactory.createPrimitive(value);
		}, fn.length, name);
	}
};
