import { toString } from "../utils/native";

import $eval from "./global.eval";
import $isFinite from "./global.is-finite";
import $isNaN from "./global.is-nan";
import $parseInt from "./global.parse-int";

export default function (env) {
  let { global: globalObject, objectFactory, options } = env;

  globalObject.define("Infinity", objectFactory.createPrimitive(Infinity), { configurable: false, writable: false });
  globalObject.define("NaN", objectFactory.createPrimitive(NaN), { configurable: false, writable: false });

  ["parseFloat", "decodeURI", "encodeURI", "decodeURIComponent", "encodeURIComponent", "escape", "unescape"].forEach(name => {
    globalObject.define(name, objectFactory.createBuiltInFunction(function* (value) {
      let stringValue = yield toString(value);
      return objectFactory.createPrimitive(global[name](stringValue));
    }, 1, name));
  });

  $isFinite(globalObject, env, objectFactory);
  $isNaN(globalObject, env, objectFactory);
  $parseInt(globalObject, env, objectFactory);

  if (options.parser) {
    $eval(globalObject, env, objectFactory);
  }
}
