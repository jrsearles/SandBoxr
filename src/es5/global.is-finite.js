import { toNumber } from "../utils/native";

export default function ($target, env, factory) {
  $target.define("isFinite", factory.createBuiltInFunction(function* (value) {
    let numberValue = yield toNumber(value);
    return factory.createPrimitive(isFinite(numberValue));
  }, 1, "isFinite"));
}