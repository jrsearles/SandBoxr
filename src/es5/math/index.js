import {toNativeFunction} from "../../utils/native";

const constants = ["E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"];
const methods = ["abs", "acos", "asin", "atan", "atan2", "ceil", "cos", "exp", "floor", "log", "max", "min", "pow", "random", "round", "sin", "sqrt", "tan"];

export default function mathApi (env) {
  const {global: globalObject, objectFactory} = env;

  let mathClass = objectFactory.createObject();
  mathClass.className = "Math";

  constants.forEach(name => {
    mathClass.define(name, objectFactory.createPrimitive(Math[name]), {configurable: false, enumerable: false, writable: false});
  });

  methods.forEach(name => {
    mathClass.define(name, toNativeFunction(env, Math[name], `Math.${name}`));
  });

  globalObject.define("Math", mathClass);
}
