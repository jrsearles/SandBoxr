import { assertIsNotGeneric } from "../../utils/contracts";

export default function ($target, env, factory) {
  $target.define("valueOf", factory.createBuiltInFunction(function () {
    assertIsNotGeneric(this.object, "String", "String.prototype.valueOf");
    return factory.create("String", this.object.value);
  }, 0, "String.prototype.valueOf"));
}
