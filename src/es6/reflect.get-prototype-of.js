import {assertIsObject} from "../utils/contracts";

export default function ($target, env, factory) {
  $target.define("getPrototypeOf", factory.createBuiltInFunction(function (target) {
    assertIsObject(target, "Reflect.getPrototypeOf");
    return target.getPrototype();
  }, 1, "Reflect.getPrototypeOf"));
}
