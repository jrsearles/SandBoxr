import {assertIsObject} from "../utils/contracts";
import {toPropertyKey} from "../utils/native";
import {defineProperty} from "../es5/object/object-helpers";

export default function ($target, env, factory) {
  $target.define("defineProperty", factory.createBuiltInFunction(function* (target, propertyKey, descriptor) {
    assertIsObject(target, "Reflect.defineProperty");

    let key = yield toPropertyKey(propertyKey);
    return factory.createPrimitive(yield defineProperty(env, target, key, descriptor, false));
  }, 3, "Reflect.defineProperty"));
}
