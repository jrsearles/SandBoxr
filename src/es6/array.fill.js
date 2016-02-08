import { UNDEFINED } from "../types/primitive-type";
import { toObject, toLength, toInteger } from "../utils/native";
import { isUndefined } from "../utils/checks";
import { normalizeIndex } from "./array-helpers";

export default function ($target, env, factory) {
  $target.define("fill", factory.createBuiltInFunction(function* (value, start, end) {
    let arr = toObject(this.object);
    let length = yield toLength(arr);
    let k = yield toInteger(start);
    let final = isUndefined(end) ? length : (yield toInteger(end));

    k = normalizeIndex(k, length);
    final = normalizeIndex(final, length);

    while (k < final) {
      arr.setValue(k++, value || UNDEFINED);
    }

    return arr;
  }, 1, "Array.prototype.fill"));
}