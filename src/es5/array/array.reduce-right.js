import { toLength, toObject } from "../../utils/native";
import { assertIsFunction, assertIsNotNullOrUndefined } from "../../utils/contracts";
import iterate from "../../iterators/";
import { executeAccumulator } from "./array-helpers";

export default function ($target, env, factory) {
  $target.define("reduceRight", factory.createBuiltInFunction(function* (callback, initialValue) {
    let length = yield toLength(this.object);
    assertIsNotNullOrUndefined(this.object, "Array.prototype.reduceRight");
    let arr = toObject(this.object);
    assertIsFunction(callback, arr);

    let accumulator;
    let hasInitialValue = false;

    if (arguments.length > 1) {
      accumulator = initialValue;
      hasInitialValue = true;
    }

    let hasElements = false;
    if (length > 0) {
      for (let entry of iterate.reverse(arr, length - 1)) {
        if (!hasElements) {
          hasElements = true;

          if (!hasInitialValue) {
            accumulator = entry.value;
            continue;
          }
        }

        accumulator = yield executeAccumulator(env, callback, accumulator, entry, arr);
      }
    }

    if (!hasElements && !hasInitialValue) {
      throw TypeError("Reduce of empty array with no initial value");
    }

    return accumulator;
  }, 1, "Array.prototype.reduceRight"));

}