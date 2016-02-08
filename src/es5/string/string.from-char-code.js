import { map } from "../../utils/async";
import { toPrimitive } from "../../utils/native";

export default function ($target, env, factory) {
  $target.define("fromCharCode", factory.createBuiltInFunction(function* (...charCodes) {
    let args = yield* map(charCodes, function* (arg) { return yield toPrimitive(arg); });
    return factory.create("String", String.fromCharCode(...args));
  }, 1, "String.fromCharCode"));
}