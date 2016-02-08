import { toLength, toObject, toBoolean } from "../../utils/native";
import { assertIsFunction, assertIsNotNullOrUndefined } from "../../utils/contracts";
import iterate from "../../iterators/";
import { executeCallback } from "./array-helpers";

export default function ($target, env, factory) {
  $target.define("every", factory.createBuiltInFunction(function* (callback, thisArg) {
    assertIsNotNullOrUndefined(this.object, "Array.prototype.every");
    let arr = toObject(this.object);
    let length = yield toLength(arr);
    assertIsFunction(callback, arr);

    for (let entry of iterate.forward(arr, 0, length)) {
      let passed = toBoolean(yield executeCallback(env, callback, entry, thisArg, arr));
      if (!passed) {
        return factory.createPrimitive(false);
      }
    }

    return factory.createPrimitive(true);
  }, 1, "Array.prototype.every"));
}