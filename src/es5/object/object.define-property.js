import {assertIsObject} from "../../utils/contracts";
import {toPropertyKey} from "../../utils/native";
import {defineProperty} from "./object-helpers";

export default function ($target, env, factory) {
  $target.define("defineProperty", factory.createBuiltInFunction(function* (obj, propertyKey, descriptor) {
    assertIsObject(obj, "Object.defineProperty");
    let key = yield toPropertyKey(propertyKey);
    yield defineProperty(env, obj, key, descriptor);
    return obj;
  }, 3, "Object.defineProperty"));
}
