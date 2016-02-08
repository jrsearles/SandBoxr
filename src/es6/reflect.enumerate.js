import { assertIsObject } from "../utils/contracts";

export default function ($target, env, factory) {
  $target.define("enumerate", factory.createBuiltInFunction(function (target) {
    assertIsObject(target, "Reflect.enumerate");
    return target.getIterator();
  }, 1, "Reflect.enumerate"));
}
