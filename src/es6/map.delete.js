import {assertIsMap} from "../utils/contracts";
import {findIndex} from "./collection-helpers";

export default function ($target, env, factory) {
  $target.define("delete", factory.createBuiltInFunction(function (key) {
    assertIsMap(this.object, "Map.prototype.delete");

    let data = this.object.data;
    if (data.length > 0) {
      let index = findIndex(this.object, key);
      if (index >= 0) {
        // leave holes in array
        data[index] = undefined;
        return factory.createPrimitive(true);
      }
    }

    return factory.createPrimitive(false);
  }, 1, "Map.prototype.delete"));
}
