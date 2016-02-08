import { toLength, toBoolean } from "../utils/native";
import { UNDEFINED } from "../types/primitive-type";
import { executeCallback } from "./array-helpers";
import { assertIsNotNullOrUndefined, assertIsFunction } from "../utils/contracts";

export default function ($target, env, factory) {
  $target.define("findIndex", factory.createBuiltInFunction(function* (predicate, thisArg) {
    assertIsNotNullOrUndefined(this.object, "Array.prototype.findIndex");

    let length = yield toLength(this.object);

    assertIsFunction(predicate, "predicate");

    let i = 0;
    while (i < length) {
      let propInfo = this.object.getProperty(i);
      let value = propInfo ? propInfo.getValue() : UNDEFINED;
      let passed = toBoolean(yield executeCallback(env, predicate, { key: i, value }, thisArg, this.object));
      if (passed) {
        return factory.createPrimitive(i);
      }

      i++;
    }

    return factory.createPrimitive(-1);
  }, 1, "Array.prototype.findIndex"));
}