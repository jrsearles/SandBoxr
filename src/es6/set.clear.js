import {assertIsSet} from "../utils/contracts";

export default function ($target, env, factory) {
  $target.define("clear", factory.createBuiltInFunction(function () {
    assertIsSet(this.object, "Set.prototype.clear");
    this.object.data = [];
  }, 0, "Set.prototype.clear"));
}
