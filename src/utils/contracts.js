var objectRgx = /\[object (\w+)\]/;
var integerRgx = /^-?\d+$/;

export function assertIsObject (obj, methodName, message) {
	if (!isObject(obj)) {
		throw new TypeError(`${methodName} called on non-object`);
	}
}

export function assertIsNotNullOrUndefined (value, methodName) {
	if (isNullOrUndefined(value)) {
		throw new TypeError(`${methodName} called on null or undefined`);
	}
}

export function assertArgIsNotNullOrUndefined (obj) {
	if (isNullOrUndefined(obj)) {
		throw new TypeError("Cannot convert null or undefined to object");
	}
}

export function	assertIsFunction (obj, toString) {
	if (!obj || obj.className !== "Function") {
		throw new TypeError("%s is not a function");
	}
}

export function	assertIsNotConstructor (context, methodName) {
	if (context.isNew) {
		throw new TypeError(`${methodName} is not a constructor`);
	}
}

export function	assertIsValidArrayLength (length) {
	if (!isValidArrayLength(length)) {
		throw new RangeError("Invalid array length");
	}
}

export function	assertIsValidParameterName (name) {
	if (/^\d|[;\(\)"']/.test(name)) {
		throw new SyntaxError(`Unexpected token in ${name}`);
	}
}

export function	assertIsNotGeneric (obj, expectedClass, methodName) {
	if (!obj || obj.className !== expectedClass) {
		throw new TypeError(`${methodName} is not generic`)
	}
}

export function	isValidArrayLength (length) {
	return isInteger(length) && length >= 0 && length < 4294967296;
}

export function	isObject (obj) {
	if (!obj) {
		return false;
	}

	if (obj.isPrimitive) {
		return obj.value && obj.type === "object";
	}

	return true;
}

export function	areSame (a, b) {
	if (a.type !== b.type) {
		return false;
	}

	if (a.isPrimitive && b.isPrimitive) {
		if (a.value == null) {
			return true;
		}

		if (a.type === "number") {
			if (isNaN(a.value) && isNaN(b.value)) {
				return true;
			}

			if (a.value === 0) {
				// this will account for negative zero
				return 1 / a.value === 1 / b.value;
			}
		}

		return a.value === b.value;
	}

	return a === b;
}

export function	getType (obj) {
	return objectRgx.exec(Object.prototype.toString.call(obj))[1];
}

export function	isNullOrUndefined (obj) {
	return isUndefined(obj) || isNull(obj);
}

export function	isUndefined (obj) {
	return !obj || (obj.isPrimitive && obj.value === undefined);
}

export function	isNull (obj) {
	return obj && obj.isPrimitive && obj.value === null;
}

export function	isInteger (value) {
	if (typeof value === "string") {
		return integerRgx.test(value);
	}

	if (typeof value === "number") {
		return isFinite(value) && Math.floor(value) === value;
	}

	return false;
}
