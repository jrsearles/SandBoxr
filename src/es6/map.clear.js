import { assertIsMap } from "../utils/contracts";

export default function ($target, env, factory) {
  $target.define("clear", factory.createBuiltInFunction(function () {
    assertIsMap(this.object, "Map.prototype.clear");
    this.object.data = [];
  }, 0, "Map.prototype.clear"));
}
