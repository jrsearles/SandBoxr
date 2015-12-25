import {tryExecute as tryExec} from "../utils/func";

const sign = Math.sign;
const floor = Math.floor;
const abs = Math.abs;
const MAX_LENGTH = Math.pow(2, 53) - 1;

function* getString (value) {
	if (!value) {
		return "undefined";
	}

	if (value.isPrimitive) {
		return String(value.toNative());
	}

	let primitiveValue = yield tryExec(value, "toString");
	if (primitiveValue && primitiveValue.isPrimitive) {
		return String(primitiveValue.value);
	}

	primitiveValue = yield tryExec(value, "valueOf");
	if (primitiveValue && primitiveValue.isPrimitive) {
		return String(primitiveValue.value);
	}

	throw TypeError("Cannot convert object to primitive value.");
}

function* getPrimitive (value) {
	if (!value) {
		return 0;
	}

	if (value.isPrimitive) {
		return value.toNative();
	}

	let primitiveValue = yield tryExec(value, "valueOf");
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.toNative();
	}

	primitiveValue = yield tryExec(value, "toString");
	if (primitiveValue && primitiveValue.isPrimitive) {
		return primitiveValue.toNative();
	}

	throw TypeError("Cannot convert object to primitive value.");
}

function* getValues (args) {
	let values = [];

	for (let i = 0, ln = args.length; i < ln; i++) {
		values.push(yield getPrimitive(args[i]));
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

function* getNativeConversion (obj, key, hint) {
	let env = obj[Symbol.for("env")];
	let method = obj.getValue(key);
	let value = yield method.call(obj, [env.objectFactory.createPrimitive(hint)]);
	return value ? value.toNative() : undefined;
}

export function* toPrimitive (obj, preferredType) {
	let hint = preferredType && preferredType.toLowerCase();
	if (!hint && obj) {
		hint = obj.primitiveHint;
	}
	
	if (obj && (!obj.isPrimitive || obj.value != null)) {
		let toPrimitiveKey = getEnv(obj).getSymbol("toPrimitive");
		if (toPrimitiveKey && obj.has(toPrimitiveKey)) {
			return yield getNativeConversion(obj, toPrimitiveKey, preferredType || "default");
		}
	}
	
	if (obj && obj.isSymbol) {
		throw TypeError(`Cannot convert Symbol to a ${hint}`);
	}

	if (hint === "string") {
		return yield getString(obj);
	}

	// default case/number
	return yield getPrimitive(obj);
}

export function* toString (obj) {
	return String(yield toPrimitive(obj, "string"));
}

export function* toNumber (obj) {
	if (!obj || obj.type === "undefined") {
		return NaN;
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