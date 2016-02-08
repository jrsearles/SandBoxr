import {assertIsNotGeneric} from "../../utils/contracts";

export default function ($target, env, factory) {
  $target.define("toString", factory.createBuiltInFunction(function () {
    assertIsNotGeneric(this.object, "Function", "Function.prototype.toString");

    if (this.object.native) {
      return factory.createPrimitive("function () { [native code] }");
    }

    return factory.createPrimitive("function () { [user code] }");
  }, 0, "Function.prototype.toString"));
}
