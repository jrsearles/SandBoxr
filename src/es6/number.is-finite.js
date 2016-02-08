import { isNumber } from "../utils/checks";

export default function (target, env, factory) {
  target.define("isFinite", factory.createBuiltInFunction(function (value) {
    if (!isNumber(value)) {
      return factory.createPrimitive(false);
    }

    let numberValue = value.toNative();
    if (isNaN(numberValue) || !isFinite(numberValue)) {
      return factory.createPrimitive(false);
    }

    return factory.createPrimitive(true);
  }, 1, "Number.isFinite"));
}
