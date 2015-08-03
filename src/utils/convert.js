import * as func from "../utils/func";

var sign = require("core-js/library/fn/math/sign");
var floor = Math.floor;
var abs = Math.abs;

function getString (env, value) {
	if (!value) {
		return "undefined";
	}

	if (value.isPrimitive) {
		return String(value.value);
	}

	var primitiveValue = func.tryCallMethod(env, value, "toString");
	if (primitiveValue && primitiveValue.isPrimitive) {
		return String(primitiveValue.value);
	}

	primitiveValue = func.tryCallMethod(env, value, "valueOf");
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

	var primitiveValue = func.tryCallMethod(env, value, "valueOf");
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.value;
	}

	primitiveValue = func.tryCallMethod(env, value, "toString");
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

export function primitiveToObject (env, value) {
	var newValue = env.objectFactory.createPrimitive(value);
	newValue.isPrimitive = false;
	newValue.type = "object";
	return newValue;
}

export function	toObject (env, obj) {
	if (obj.isPrimitive && obj.value != null && obj.type !== "object") {
		return primitiveToObject(env, obj.value);
	}

	return obj;
}

export function	toArray (obj, length) {
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
}

export function	toPrimitive (env, obj, preferredType) {
	preferredType = preferredType && preferredType.toLowerCase();
	if (!preferredType && obj) {
		preferredType = obj.primitiveHint;
	}

	if (preferredType === "string") {
		return getString(env, obj);
	}

	// default case/number
	return getPrimitive(env, obj);
}

export function	toString (env, obj) {
	return String(toPrimitive(env, obj, "string"));
}

export function	toNumber (env, obj) {
	if (!obj || obj.type === "undefined") {
		return NaN;
	}

	return Number(toPrimitive(env, obj, "number"));
}

export function	toInteger (env, obj) {
	var value = toNumber(env, obj);
	if (isNaN(value)) {
		return 0;
	}

	if (value === 0 || !isFinite(value)) {
		return value;
	}

	return sign(value) * floor(abs(value));
}

export function	toInt32 (env, obj) {
	var value = toInteger(env, obj);
	return isFinite(value) ? value : 0;
}

export function	toUInt32 (env, obj) {
	var value = toInt32(env, obj);
	return value >>> 0;
}

export function	toBoolean (obj) {
	if (!obj) {
		return false;
	}

	if (obj.isPrimitive) {
		return Boolean(obj.value);
	}

	return true;
}

export function	toNativeFunction (env, fn, name) {
	return env.objectFactory.createBuiltInFunction(function () {
		var scope = this && this.node && this.node.value;
		var args = getValues(env, arguments);

		var value = fn.apply(scope, args);
		return env.objectFactory.createPrimitive(value);
	}, fn.length, name);
}