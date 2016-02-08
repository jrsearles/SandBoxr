import {isNumber} from "../utils/checks";
import {toInteger} from "../utils/native";

export default function (target, env, factory) {
  const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
  const MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;

  target.define("MAX_SAFE_INTEGER", factory.createPrimitive(MAX_SAFE_INTEGER), {configurable: false, writable: false});
  target.define("MIN_SAFE_INTEGER", factory.createPrimitive(MIN_SAFE_INTEGER), {configurable: false, writable: false});

  target.define("isSafeInteger", factory.createBuiltInFunction(function* (value) {
    if (!isNumber(value)) {
      return factory.createPrimitive(false);
    }

    let numberValue = value.toNative();
    if (isNaN(numberValue) || !isFinite(numberValue)) {
      return factory.createPrimitive(false);
    }

    let intValue = yield toInteger(value);
    if (intValue !== numberValue) {
      return factory.createPrimitive(false);
    }

    return factory.createPrimitive(Math.abs(numberValue) <= MAX_SAFE_INTEGER);
  }, 1, "Number.isSafeInteger"));
}
