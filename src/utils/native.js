import "../polyfills";
import {tryExecute as tryExec} from "../utils/func";

const sign = Math.sign;
const floor = Math.floor;
const abs = Math.abs;

function* getString (env, value) {
	if (!value) {
		return "undefined";
	}

	if (value.isPrimitive) {
		return String(value.toNative());
	}

	let primitiveValue = yield tryExec(env, value, "toString");
	if (primitiveValue && primitiveValue.isPrimitive) {
		return String(primitiveValue.value);
	}

	primitiveValue = yield tryExec(env, value, "valueOf");
	if (primitiveValue && primitiveValue.isPrimitive) {
		return String(primitiveValue.value);
	}

	throw new TypeError("Cannot convert object to primitive value.");
}

function* getPrimitive (env, value) {
	if (!value) {
		return 0;
	}

	if (value.isPrimitive) {
		return value.toNative();
	}

	let primitiveValue = yield tryExec(env, value, "valueOf");
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.toNative();
	}

	primitiveValue = yield tryExec(env, value, "toString");
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.toNative();
	}

	throw new TypeError("Cannot convert object to primitive value.");
}

function* getValues (env, args) {
	let values = [];

	for (let i = 0, ln = args.length; i < ln; i++) {
		values.push(yield getPrimitive(env, args[i]));
	}

	return values;
}

export function primitiveToObject (env, value) {
	let newValue = env.objectFactory.createPrimitive(value);
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
	let arr = [];

	if (obj) {
		let ln = length >= 0 ? length : obj.getValue("length").toNative();
		let i = 0;

		while (i < ln) {
			if (obj.hasProperty(i)) {
				arr[i] = obj.getValue(i);
			}

			i++;
		}
	}

	return arr;
}

export function* toPrimitive (env, obj, preferredType) {
	preferredType = preferredType && preferredType.toLowerCase();
	if (!preferredType && obj) {
		preferredType = obj.primitiveHint;
	}

	if (preferredType === "string") {
		return yield getString(env, obj);
	}

	// default case/number
	return yield getPrimitive(env, obj);
}

export function* toString (env, obj) {
	return String(yield toPrimitive(env, obj, "string"));
}

export function* toNumber (env, obj) {
	if (!obj || obj.type === "undefined") {
		return NaN;
	}

	return Number(yield toPrimitive(env, obj, "number"));
}

export function* toInteger (env, obj) {
	let value = yield toNumber(env, obj);
	if (isNaN(value)) {
		return 0;
	}

	if (value === 0 || !isFinite(value)) {
		return value;
	}

	return sign(value) * floor(abs(value));
}

export function* toInt32 (env, obj) {
	let value = yield toInteger(env, obj);
	return isFinite(value) ? value : 0;
}

export function* toUInt32 (env, obj) {
	let value = yield toInt32(env, obj);
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
	return env.objectFactory.createBuiltInFunction(function* () {
		let scope = this && this.node && this.node.toNative();
		let args = yield getValues(env, arguments);

		let value = fn.apply(scope, args);
		return env.objectFactory.createPrimitive(value);
	}, fn.length, name);
}