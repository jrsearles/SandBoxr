import {UNDEFINED} from "../../types/primitive-type";
import {isNullOrUndefined} from "../../utils/contracts";
import {toObject} from "../../utils/native";

export function defineThis (env, fn, thisArg) {
	if (fn.builtIn || fn.isStrict()) {
		return thisArg || UNDEFINED;
	}

	if (isNullOrUndefined(thisArg)) {
		return env.global;
	}

	return toObject(thisArg);
}