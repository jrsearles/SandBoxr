import {toBoolean} from "../../utils/native";

import $toString from "./boolean.to-string";
import $valueOf from "./boolean.value-of";

export default function booleanApi (env) {
  const {global: globalObject, objectFactory} = env;

  let proto = objectFactory.createObject();
  proto.className = "Boolean";
  proto.value = false;

  let booleanClass = objectFactory.createFunction(function (value) {
    let booleanValue = toBoolean(value);
    let obj = objectFactory.create("Boolean", booleanValue);

    // called as new
    if (this.isNew) {
      return obj.toObject();
    }

    return obj;
  }, proto, {configurable: false, enumerable: false, writable: false, name: "Boolean"});

  $toString(proto, env, objectFactory);
  $valueOf(proto, env, objectFactory);

  globalObject.define("Boolean", booleanClass);
}
