import { confirmObject } from "./object-helpers";

export default function ($target, env, factory) {
  $target.define("isFrozen", factory.createBuiltInFunction(function (obj) {
    if (!confirmObject(obj, "Object.isFrozen", env.ecmaVersion)) {
      return factory.createPrimitive(true);
    }

    if (obj.isPrimitive) {
      return factory.createPrimitive(true);
    }

    if (!obj.isExtensible()) {
      let keys = obj.getOwnPropertyKeys();
      for (let i = 0, ln = keys.length; i < ln; i++) {
        let desc = obj.getOwnProperty(keys[i]);
        if (desc.writable || desc.configurable) {
          return factory.createPrimitive(false);
        }
      }
    }

    return factory.createPrimitive(!obj.extensible);
  }, 1, "Object.isFrozen"));
}
