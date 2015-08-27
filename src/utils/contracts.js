import keywords from "../keywords";

const objectRgx = /\[object (\w+)\]/;
const integerRgx = /^-?\d+$/;

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

export function assertIsValidAssignment (left, strict) {
	if (left && !left.isReference) {
		throw new ReferenceError("Invalid left-hand side in assignment");
	}
	
	assertIsValidName(left.name, strict);
}

export function	assertIsValidParameterName (name, strict) {
	if (/^\d|[;\(\)"']/.test(name)) {
		throw new SyntaxError(`Unexpected token in ${name}`);
	}
	
	assertIsValidName(name, strict);
}

function assertIsValidName (name, strict) {
	if (strict && (name === "arguments" || name === "eval")) {
		throw new SyntaxError("Unexpected eval or arguments in strict mode");	
	}
}

export function	assertIsNotGeneric (obj, expectedClass, methodName) {
	if (!obj || obj.className !== expectedClass) {
		throw new TypeError(`${methodName} is not generic`)
	}
}

export function assertIsValidIdentifier (name, strict) {
	if (keywords.isReserved(name)) {
		throw new SyntaxError(`Illegal use of reserved keyword: ${name}`);
	}

	if (strict && keywords.isStrictReserved(name)) {
		throw new SyntaxError(`Illegal use of strict mode reserved keyword: ${name}`);
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

export function isStrictNode (node) {
	if (Array.isArray(node)) {
		return isStrictNode(node[0]);
	}

	return node
		&& node.type === "ExpressionStatement"
		&& node.expression.type === "Literal"
		&& node.expression.value === "use strict";	
}
