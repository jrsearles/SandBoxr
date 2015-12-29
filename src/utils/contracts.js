import {isReserved, isStrictReserved} from "../keywords";
import {SymbolType} from "../types/symbol-type";
import {toBoolean} from "./native";

const objectPattern = /\[object (\w+)\]/;
const integerPattern = /^-?\d+$/;
const octalPattern = /^-?0[0-7]/;
const octalEscapePattern = /^([^\\]|\\[^0-7])*\\([0-3][0-7]{1,2}|[4-7][0-7]|[0-7])/;
const useStrictPattern = /^\s*(?:'use strict'|"use strict")\s*;?\s*$/;

export function assertIsObject (obj, methodName) {
	if (!isObject(obj)) {
		throw TypeError(`${methodName} called on non-object`);
	}
}

export function assertIsNotNullOrUndefined (value, methodName) {
	if (isNullOrUndefined(value)) {
		throw TypeError(`${methodName} called on null or undefined`);
	}
}

export function assertArgIsNotNullOrUndefined (obj) {
	if (isNullOrUndefined(obj)) {
		throw TypeError("Cannot convert null or undefined to object");
	}
}

export function	assertIsFunction (obj, argName) {
	if (!isFunction(obj)) {
		throw TypeError(`${argName} is not a function`);
	}
}

export function	assertIsNotConstructor (context, methodName) {
	if (context.isNew) {
		throw TypeError(`${methodName} is not a constructor`);
	}
}

export function assertIsConstructor (context, methodName) {
	if (!context.isNew) {
		throw TypeError(`${methodName} must be called with 'new'`);
	}
}

export function	assertIsValidArrayLength (length) {
	if (!isValidArrayLength(length)) {
		throw RangeError("Invalid array length");
	}
}

export function assertIsValidAssignment (left, strict) {
	if (left && !left.isReference) {
		throw ReferenceError("Invalid left-hand side in assignment");
	}

	if (left && left.base === left.env.global) {
		assertIsValidName(left.name, strict);
	}
}

export function	assertIsValidParameterName (name, strict) {
	if (/^\d|[;\(\)"']/.test(name)) {
		throw SyntaxError(`Unexpected token in ${name}`);
	}

	assertIsValidName(name, strict);
}

export function assertIsValidName (name, strict) {
	if (strict && (name === "arguments" || name === "eval")) {
		throw SyntaxError("Unexpected eval or arguments in strict mode");
	}
}

export function	assertIsNotGeneric (obj, expectedClass, methodName) {
	if (!obj || obj.className !== expectedClass) {
		throw TypeError(`${methodName} is not generic`);
	}
}

export function assertIsValidIdentifier (name, strict) {
	if (isReserved(name)) {
		throw SyntaxError(`Illegal use of reserved keyword: ${name}`);
	}

	if (strict && isStrictReserved(name)) {
		throw SyntaxError(`Illegal use of strict mode reserved keyword: ${name}`);
	}
	
	assertIsValidName(name, strict);
}

export function assertAreValidArguments (params, strict) {
	params.forEach((param, index) => {
		assertIsValidParameterName(param.name, strict);

		if (strict) {
			if (params.some((p, i) => index !== i && param.name === p.name)) {
				throw SyntaxError("Strict mode function may not have duplicate parameter names");
			}
		}
	});
}

export function assertAreValidSetterArguments (params, strict) {
	assertAreValidArguments(params, strict);
	if (params.some(p => p.isRestElement())) {
		throw SyntaxError("A rest element cannot be used with a setter");
	}
}

export function assertIsMap (obj, methodName) {
	if (!obj || obj.className !== "Map") {
		throw TypeError(`The object must be a map when calling ${methodName}`);
	}
}

export function assertIsSet (obj, methodName) {
	if (!obj || obj.className !== "Set") {
		throw TypeError(`The object must be a set when calling ${methodName}`);
	}
}

export function	isValidArrayLength (length) {
	return isInteger(length) && length >= 0 && length < 4294967296;
}

export function	isObject (obj) {
	if (!obj) {
		return false;
	}

	if (obj.isSymbol) {
		return false;
	}

	if (obj.isPrimitive) {
		return obj.value && obj.type === "object";
	}

	return true;
}

export function isRegExp (obj) {
	if (!isObject(obj)) {
		return false;
	}

	let matchKey = SymbolType.getByKey("match");
	let matchProp = obj.getProperty(matchKey);
	if (matchProp) {
		let matchValue = matchProp.getValue();
		if (!isUndefined(matchValue)) {
			return toBoolean(matchValue);
		}
	}

	return obj.className === "RegExp";
}

export function isNumber (obj) {
	return obj && obj.type === "number";
}

export function isNegativeZero (obj) {
	return isNumber(obj) && obj.value === 0 && 1 / obj.value < 0;
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
	// manually check for null/undefined or IE9 will coerce them to the global
	if (obj === undefined) {
		return "Undefined";
	}

	if (obj === null) {
		return "Null";
	}

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

export function isFunction (obj) {
	return !!obj && obj.className === "Function";
}

export function isConstructor (obj) {
	if (!isFunction(obj)) {
		return false;
	}

	return obj.canConstruct;
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
	if (!nodes) {
		return false;
	}

	if (Array.isArray(nodes)) {
		for (let node of nodes) {
			if (!isDirective(node)) {
				return false;
			}

			if (node.expression.value === "use strict" && useStrictPattern.test(node.expression.raw)) {
				return true;
			}
		}

		return false;
	}

	if (nodes.body) {
		return isStrictNode(nodes.body);
	}

	return false;
}
