import { toPrimitive } from "../../utils/native";

export default function ($target, env, factory) {
  $target.define("parse", factory.createBuiltInFunction(function* (value) {
    let stringValue = yield toPrimitive(value, "string");
    let dateValue = Date.parse(stringValue);
    return factory.createPrimitive(dateValue);
  }, 1, "Date.prototype.parse"));
}
