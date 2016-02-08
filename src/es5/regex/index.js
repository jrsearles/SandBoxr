import {toString, toNativeFunction} from "../../utils/native";
import {isUndefined} from "../../utils/checks";

import $exec from "./regex.exec";
import $test from "./regex.test";
import $toString from "./regex.to-string";

export default function (env) {
  const {global: globalObject, objectFactory} = env;

  let proto = objectFactory.createObject();
  proto.className = "RegExp";

  let regexClass = objectFactory.createFunction(function* (pattern, flags) {
    if (pattern && pattern.className === "RegExp") {
      if (isUndefined(flags)) {
        return pattern;
      }

      throw TypeError("Cannot supply flags when constructing one RegExp from another");
    }

    let patternString = isUndefined(pattern) ? "" : (yield toString(pattern));
    flags = isUndefined(flags) ? "" : (yield toString(flags));

    return objectFactory.create("RegExp", new RegExp(patternString, flags));
  }, proto, {configurable: false, enumerable: false, writable: false, name: "RegExp"});

  $exec(proto, env, objectFactory);
  $test(proto, env, objectFactory);
  $toString(proto, env, objectFactory);

  proto.define("compile", toNativeFunction(env, RegExp.prototype.compile, "RegExp.prototype.compile"));
  proto.defineProperty("lastIndex", {value: objectFactory.createPrimitive(0), writable: true});

  ["global", "ignoreCase", "multiline"].forEach(name => {
    proto.defineProperty(name, {value: objectFactory.createPrimitive(false)});
  });
  
  proto.defineProperty("source", {value: objectFactory.createPrimitive("")});

  globalObject.define("RegExp", regexClass);
}
