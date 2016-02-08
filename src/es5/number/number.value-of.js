import {assertIsNotGeneric} from "../../utils/contracts";

export default function ($target, env, factory) {
  $target.define("valueOf", factory.createBuiltInFunction(function () {
    assertIsNotGeneric(this.object, "Number", "Number.prototype.valueOf");
    return factory.createPrimitive(this.object.value == null ? 0 : this.object.value);
  }, 0, "Number.prototype.valueOf"));
}
