import { assertIsObject } from "../utils/contracts";
import { getOwnPropertyDescriptor } from "../es5/object/object-helpers";

export default function ($target, env, factory) {
  $target.define("getOwnPropertyDescriptor", factory.createBuiltInFunction(function* (target, propertyKey) {
    assertIsObject(target, "Reflect.getOwnPropertyDescriptor");
    return yield getOwnPropertyDescriptor(env, target, propertyKey);
  }, 2, "Reflect.getOwnPropertyDescriptor"));
}