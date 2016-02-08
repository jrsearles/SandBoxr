import {assertIsNotGeneric} from "../../utils/contracts";

export default function ($target, env, factory) {
  $target.define("toString", factory.createBuiltInFunction(function () {
    assertIsNotGeneric(this.object, "Boolean", "Boolean.prototype.toString");
    return factory.createPrimitive(String(this.object.value));
  }, 0, "Boolean.prototype.toString"));
}