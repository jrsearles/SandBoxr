import { assertIsObject } from "../utils/contracts";

export default function ($target, env, factory) {
  $target.define("ownKeys", factory.createBuiltInFunction(function (target) {
    assertIsObject(target, "Reflect.ownKeys");

    let keys = target.getOwnPropertyKeys().map(key => factory.createPrimitive(key));
    return factory.createArray(keys);
  }, 1, "Reflect.ownKeys"));
}