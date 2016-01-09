import {toBoolean} from "../../utils/native";
import {isObject, isUndefined} from "../../utils/checks";
import {SymbolType} from "../../types/symbol-type";
import {UNDEFINED} from "../../types/primitive-type";

export function getStartIndex (index, length) {
	if (index < 0) {
		return Math.max(length + index, 0);
	}

	return Math.min(index || 0, length);
}

export function getEndIndex (index, length) {
	if (index < 0) {
		return Math.max(length + index, 0);
	}

	return Math.min(index, length);
}

export function* executeCallback (env, callback, entry, thisArg, arr) {
	if (!thisArg) {
		thisArg = callback.isStrict() ? UNDEFINED : env.global;
	}

	let key = env.objectFactory.createPrimitive(entry.key);
	let args = [entry.value, key, arr];
	return yield callback.call(thisArg, args) || UNDEFINED;
}

export function* executeAccumulator (env, callback, priorValue, entry, arr) {
	let key = env.objectFactory.createPrimitive(entry.key);
	let args = [priorValue || UNDEFINED, entry.value || UNDEFINED, key, arr];
	return yield callback.call(UNDEFINED, args) || UNDEFINED;
}

export function isSpreadable (obj) {
	if (!isObject(obj)) {
		return false;
	}

	let key = SymbolType.getByKey("isConcatSpreadable");
	let propInfo = obj.getProperty(key);
	if (propInfo) {
		let spreadable = propInfo.getValue();
		if (!isUndefined(spreadable)) {
			return toBoolean(spreadable);
		}
	}

	return obj.className === "Array";
}
