import { UNDEFINED } from "../../types/primitive-type";
import { isNullOrUndefined } from "../../utils/checks";
import { toObject } from "../../utils/native";

export function defineThis (env, fn, thisArg) {
  if (fn.builtIn || fn.isProxy || fn.isStrict()) {
    return thisArg || UNDEFINED;
  }

  if (isNullOrUndefined(thisArg)) {
    return env.global;
  }

  return toObject(thisArg);
}