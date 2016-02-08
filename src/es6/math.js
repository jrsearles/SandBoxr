import { toNativeFunction } from "../utils/native";

export default function ($global, env, factory) {
  let mathClass = $global.getValue("Math");

  ["acosh", "asinh", "atanh", "cbrt", "clz32", "cosh", "expm1", "fround", "hypot", "imul", "log10", "log2", "log1p", "sign", "sinh", "tanh", "trunc"].forEach(name => {
    mathClass.define(name, toNativeFunction(env, Math[name], `Math.${name}`));
  });
}
