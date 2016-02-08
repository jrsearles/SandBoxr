import { isNumber } from "../utils/checks";
import { toInteger } from "../utils/native";

export default function (target, env, factory) {
  target.define("isInteger", factory.createBuiltInFunction(function* (value) {
    if (!isNumber(value)) {
      return factory.createPrimitive(false);
    }

    let numberValue = value.toNative();
    if (isNaN(numberValue) || !isFinite(numberValue)) {
      return factory.createPrimitive(false);
    }

    let intValue = yield toInteger(value);
    return factory.createPrimitive(numberValue === intValue);
  }, 1, "Number.isInteger"));
}
