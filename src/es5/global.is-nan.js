import { toNumber } from "../utils/native";

export default function ($target, env, factory) {
  $target.define("isNaN", factory.createBuiltInFunction(function* (value) {
    let numberValue = yield toNumber(value);
    return factory.createPrimitive(isNaN(numberValue));
  }, 1, "isNaN"));
}