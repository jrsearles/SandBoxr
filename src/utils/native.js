import {getMethod} from "../utils/helpers";
import {isNullOrUndefined, isFunction, isUndefined, isNull} from "./checks";

const sign = Math.sign;
const floor = Math.floor;
const abs = Math.abs;
const MAX_LENGTH = Math.pow(2, 53) - 1;

const integerPattern = /^-?\d+$/;
const octalPattern = /^-?0[0-7]/;
const octalEscapePattern = /^([^\\]|\\[^0-7])*\\([0-3][0-7]{1,2}|[4-7][0-7]|[0-7])/;

function* getPrimitive (value, methods, defaultValue) {
	if (!value) {
		return defaultValue;
	}

	if (value.isPrimitive) {
		return value.toNative();
	}

	let getNative = getMethod(value, methods[0]);
	if (isFunction(getNative)) {
		let primitiveValue = yield getNative.call(value);
		if (primitiveValue.isPrimitive) {
			return primitiveValue.toNative();
		}
	}
	
	getNative = getMethod(value, methods[1]);
	if (isFunction(getNative)) {
		let primitiveValue = yield getNative.call(value);
		if (primitiveValue.isPrimitive) {
			return primitiveValue.toNative();
		}
	}

	throw TypeError("Cannot convert object to primitive value.");
}

function* getValues (args) {
	let values = [];

	for (let i = 0, ln = args.length; i < ln; i++) {
		values.push(yield toPrimitive(args[i]));
	}

	return values;
}

export function primitiveToObject (env, value) {
	let newValue = env.objectFactory.createPrimitive(value);
	newValue.isPrimitive = false;
	newValue.type = "object";
	return newValue;
}

export function	toObject (obj, throwOnError) {
	// todo: is this ES6 only?
	if (throwOnError && obj.isPrimitive && obj.value == null) {
		throw TypeError(`${obj.type} cannot be converted to an object`);
	}

	if (obj.isPrimitive && obj.value != null && obj.type !== "object") {
		return primitiveToObject(getEnv(obj), obj.value);
	}

	return obj;
}

function getEnv (obj) {
	return obj[Symbol.for("env")];
}

function getOptions (obj) {
	return getEnv(obj).options;
}

export function* toLength (obj) {
	let lengthProperty = obj.getProperty("length");
	if (lengthProperty) {
		if (getOptions(obj).ecmaVersion === 5) {
			return yield toUInt32(lengthProperty.getValue());
		}

		let length = yield toInteger(lengthProperty.getValue());
		return Math.min(Math.max(length, 0), MAX_LENGTH);
	}

	return 0;
}

export function* toPropertyKey (key) {
	if (key && key.isSymbol) {
		return key;
	}

	return yield toString(key);
}

export function* toArray (obj, length) {
	let arr = [];

	if (obj) {
		if (arguments.length < 2) {
			length = yield toLength(obj);
		}

		let i = 0;
		while (i < length) {
			if (obj.has(i)) {
				arr[i] = obj.getValue(i);
			}

			i++;
		}
	}

	return arr;
}

function* tryGetNativeConversion (obj, hint) {
	if (isNullOrUndefined(obj)) {
		return false;
	}
	
	let env = getEnv(obj);
	let toPrimitiveKey = env.getSymbol("toPrimitive");
	if (!toPrimitiveKey) {
		return false;
	}
	
	let toPrimitiveFunc = getMethod(obj, toPrimitiveKey);
	if (!toPrimitiveFunc) {
		return false;
	}
	
	let value = yield toPrimitiveFunc.call(obj, [env.objectFactory.createPrimitive(hint)]);
	if (value.type === "object") {
		return false;
	}
	
	return value;
}

export function* toPrimitive (obj, preferredType) {
	let hint = preferredType && preferredType.toLowerCase();
	if (!hint && obj) {
		hint = obj.primitiveHint;
	}
	
	let nativeConversion = yield tryGetNativeConversion(obj, preferredType || "default");
	if (nativeConversion) {
		return nativeConversion.toNative();
	}

	return yield toPrimitiveOrdinary(obj, preferredType);
}

export function* toPrimitiveOrdinary (obj, preferredType) {
	let hint = preferredType && preferredType.toLowerCase();
	if (!hint && obj) {
		hint = obj.primitiveHint;
	}

	if (obj && obj.isSymbol) {
		throw TypeError(`Cannot convert Symbol to a ${hint}`);
	}

	if (hint === "string") {
		return String(yield getPrimitive(obj, ["toString", "valueOf"], "undefined"));
	}

	// default case/number
	return yield getPrimitive(obj, ["valueOf", "toString"], 0);
}

export function* toString (obj) {
	if (isUndefined(obj)) {
		return "undefined";
	}
	
	if (isNull(obj)) {
		return "null";
	}
	
	if (obj.isSymbol) {
		throw TypeError("Symbol cannot be coerced into a string.");
	}
	
	return String(yield toPrimitive(obj, "string"));
}

export function* toNumber (obj) {
	if (isUndefined(obj)) {
		return NaN;
	}
	
	if (isNull(obj)) {
		return 0;
	}
	
	if (obj.isSymbol) {
		throw TypeError("Symbol cannot be coerced into a number.")
	}
	
	return Number(yield toPrimitive(obj, "number"));
}

export function* toInteger (obj) {
	let value = yield toNumber(obj);
	if (isNaN(value)) {
		return 0;
	}

	if (value === 0 || !isFinite(value)) {
		return value;
	}

	return sign(value) * floor(abs(value));
}

export function* toInt32 (obj) {
	let value = yield toInteger(obj);
	return isFinite(value) ? value : 0;
}

export function* toUInt32 (obj) {
	let value = yield toInt32(obj);
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
		let thisArg = undefined;

		if (this && this.object && (this.object.isPrimitive || this.object.className === "Date")) {
			thisArg = this.object.value;
		}

		let args = yield getValues(arguments);
		let value = fn.apply(thisArg, args);
		return env.objectFactory.createPrimitive(value);
	}, fn.length, name);
}

export function	isInteger (value) {
	if (typeof value === "string") {
		return integerPattern.test(value);
	}

	if (typeof value === "number") {
		return isFinite(value) && Math.floor(value) === value;
	}

	return false;
}

export function	isValidArrayLength (length) {
	return isInteger(length) && length >= 0 && length < 4294967296;
}

export function isOctalLiteral (rawValue, actualValue) {
	if (typeof actualValue === "number" && octalPattern.test(rawValue)) {
		return true;
	}

	if (typeof actualValue === "string") {
		let match = rawValue.match(octalEscapePattern);
		if (match) {
			// \0 is actually not considered an octal
			if (match[2] !== "0" || typeof match[3] !== "undefined") {
				return true;
			}
		}
	}

	return false;
}
