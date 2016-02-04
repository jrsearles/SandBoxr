import {isFunction, isNullOrUndefined} from "./checks";

const objectPattern = /\[object (\w+)\]/;
const toString = Object.prototype.toString;

export function getMethod (obj, key) {
	let propInfo = obj.getProperty(key);
	let method = propInfo && propInfo.getValue();
	
	if (isNullOrUndefined(method)) {
		return null;
	}
	
	if (!isFunction(method)) {
		throw TypeError(`${key} is not a method`);
	}

	return method;
}

export function	getNativeType (obj) {
	// manually check for null/undefined or IE9 will coerce them to the global
	if (obj === undefined) {
		return "Undefined";
	}

	if (obj === null) {
		return "Null";
	}

  switch (typeof obj) {
    case "string":
      return "String";
    
    case "number":
      return "Number";
      
    case "boolean":
      return "Boolean";
      
    default:
      return objectPattern.exec(toString.call(obj))[1];    
  }
}

export function createDataProperty (obj, key, value, throwOnError) {
	obj.defineProperty(key, {value, configurable: true, enumerable: true, writable: true}, throwOnError);
}