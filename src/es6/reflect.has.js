import { assertIsObject } from "../utils/contracts";
import { toPropertyKey } from "../utils/native";

export default function ($target, env, factory) {
  $target.define("has", factory.createBuiltInFunction(function* (target, propertyKey) {
    assertIsObject(target, "Reflect.has");
    let key = yield toPropertyKey(propertyKey);
    return factory.createPrimitive(target.has(key));
  }, 2, "Reflect.has"));
}
