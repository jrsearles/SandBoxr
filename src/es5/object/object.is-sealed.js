import {confirmObject} from "./object-helpers";

export default function ($target, env, factory) {
  $target.define("isSealed", factory.createBuiltInFunction(function (obj) {
    if (!confirmObject(obj, "Object.isSealed", env.ecmaVersion)) {
      return factory.createPrimitive(true);
    }

    let extensible = obj.isExtensible();
    if (!extensible) {
      let keys = obj.getOwnPropertyKeys();
      for (let i = 0, ln = keys.length; i < ln; i++) {
        let desc = obj.getOwnProperty(keys[i]);
        if (desc.configurable) {
          return factory.createPrimitive(false);
        }
      }
    }

    return factory.createPrimitive(!extensible);
  }, 1, "Object.isSealed"));
}
