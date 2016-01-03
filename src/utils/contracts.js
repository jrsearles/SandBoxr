import {isReserved, isStrictReserved} from "../keywords";
import {SymbolType} from "../types/symbol-type";
import {toBoolean, isValidArrayLength} from "./native";
import {isObject, isFunction, isUndefined, isNullOrUndefined} from "./checks";

// const objectPattern = /\[object (\w+)\]/;
// const integerPattern = /^-?\d+$/;
// const octalPattern = /^-?0[0-7]/;
// const octalEscapePattern = /^([^\\]|\\[^0-7])*\\([0-3][0-7]{1,2}|[4-7][0-7]|[0-7])/;
// const useStrictPattern = /^\s*(?:'use strict'|"use strict")\s*;?\s*$/;

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
