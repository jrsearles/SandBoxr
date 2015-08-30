import keywords from "../keywords";

const objectPattern = /\[object (\w+)\]/;
const integerPattern = /^-?\d+$/;
const octalPattern = /^-?0[0-7]/;
const octalEscapePattern = /^([^\\]|\\[^0-7])*\\([0-3][0-7]{1,2}|[4-7][0-7]|[0-7])/;
const useStrictPattern = /^\s*(?:'use strict'|"use strict")\s*;?\s*$/;

export function assertIsObject (obj, methodName) {
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
	
	if (left && left.base === left.env.global) {
		assertIsValidName(left.name, strict);
	}
}

export function	assertIsValidParameterName (name, strict) {
	if (/^\d|[;\(\)"']/.test(name)) {
		throw new SyntaxError(`Unexpected token in ${name}`);
	}
	
	assertIsValidName(name, strict);
}

export function assertIsValidName (name, strict) {
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

export function assertAreValidArguments (params, strict) {
	if (strict) {
		params.forEach((param, index) => {
			assertIsValidName(param.name, strict);
			
			if (params.some((p, i) => index !== i && param.name === p.name)) {
				throw new SyntaxError("Strict mode function may not have duplicate parameter names");
			}
		});
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

export function	getType (obj) {
	return objectPattern.exec(Object.prototype.toString.call(obj))[1];
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
		return integerPattern.test(value);
	}

	if (typeof value === "number") {
		return isFinite(value) && Math.floor(value) === value;
	}

	return false;
}

function isDirective (node) {
	return node.type === "ExpressionStatement"
		&& node.expression.type === "Literal"
		&& typeof node.expression.value === "string";
}

export function isStrictNode (nodes) {
	if (Array.isArray(nodes)) {
		for (let node of nodes) {
			if (!isDirective(node)) {
				return false;
			}
			
			if (node.expression.value === "use strict" && useStrictPattern.test(node.expression.raw)) {
				return true;
			}
		}
	}
	
	return false;
}
