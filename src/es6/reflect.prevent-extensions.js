import { assertIsObject } from "../utils/contracts";

export default function ($target, env, factory) {
  $target.define("preventExtensions", factory.createBuiltInFunction(function (target) {
    assertIsObject(target, "Reflect.preventExtensions");
    return factory.createPrimitive(target.preventExtensions());
  }, 1, "Reflect.preventExtensions"));
}
