import { assertIsObject } from "../utils/contracts";
import { toPropertyKey } from "../utils/native";

export default function ($target, env, factory) {
  $target.define("deleteProperty", factory.createBuiltInFunction(function* (target, propertyKey) {
    assertIsObject(target, "Reflect.deleteProperty");

    let key = yield toPropertyKey(propertyKey);
    return factory.createPrimitive(target.deleteProperty(key, false));
  }, 2, "Reflect.deleteProperty"));
}
