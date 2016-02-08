import {UNDEFINED} from "../types/primitive-type";

export function normalizeIndex (index, length) {
  if (index < 0) {
    return Math.max(length + index, 0);
  }

  return Math.min(index, length);
}

export function* executeCallback (env, callback, entry, thisArg, arr) {
  if (!thisArg) {
    thisArg = callback.isStrict() ? UNDEFINED : env.global;
  }

  let args = [entry.value, env.objectFactory.createPrimitive(entry.key), arr];
  return yield callback.call(thisArg, args) || UNDEFINED;
}