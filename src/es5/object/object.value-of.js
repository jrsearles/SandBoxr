import { toObject } from "../../utils/native";

export default function ($target, env, factory) {
  $target.define("valueOf", factory.createBuiltInFunction(function () {
    if ("value" in this.object && !this.object.isPrimitive) {
      // primitive called with 'new'
      return factory.createPrimitive(this.object.value);
    }
    
    return toObject(this.object, true);
  }, 0, "Object.prototype.valueOf"));
}
