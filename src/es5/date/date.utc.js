import {map} from "../../utils/async";
import {toPrimitive} from "../../utils/native";

export default function ($target, env, factory) {
  $target.define("UTC", factory.createBuiltInFunction(function* (...args) {
    let nativeArgs = yield* map(arguments, function* (arg) { return yield toPrimitive(arg, "number"); });
    return factory.createPrimitive(Date.UTC.apply(null, nativeArgs));
  }, 7, "Date.prototype.UTC"));
}
