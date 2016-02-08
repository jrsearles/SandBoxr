import { assertIsMap } from "../utils/contracts";
import { findIndex } from "./collection-helpers";

export default function ($target, env, factory) {
  $target.define("has", factory.createBuiltInFunction(function (key) {
    assertIsMap(this.object, "Map.prototype.has");
    return factory.createPrimitive(findIndex(this.object, key) >= 0);
  }, 1, "Map.prototype.has"));
}
