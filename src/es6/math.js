import { default as acosh } from "babel-runtime/core-js/math/acosh";
import { default as asinh } from "babel-runtime/core-js/math/asinh";
import { default as atanh } from "babel-runtime/core-js/math/atanh";
import { default as cbrt } from "babel-runtime/core-js/math/cbrt";
import { default as clz32 } from "babel-runtime/core-js/math/clz32";
import { default as cosh } from "babel-runtime/core-js/math/cosh";
import { default as expm1 } from "babel-runtime/core-js/math/expm1";
import { default as fround } from "babel-runtime/core-js/math/fround";
import { default as hypot } from "babel-runtime/core-js/math/hypot";
import { default as imul } from "babel-runtime/core-js/math/imul";
import { default as log10 } from "babel-runtime/core-js/math/log10";
import { default as log2 } from "babel-runtime/core-js/math/log2";
import { default as log1p } from "babel-runtime/core-js/math/log1p";
import { default as sign } from "babel-runtime/core-js/math/sign";
import { default as sinh } from "babel-runtime/core-js/math/sinh";
import { default as tanh } from "babel-runtime/core-js/math/tanh";
import { default as trunc } from "babel-runtime/core-js/math/trunc";
import { toNativeFunction } from "../utils/native";

export default function ($global, env, factory) {
  let mathClass = $global.getValue("Math");

  // todo: there's got to be a way to import these more dynamically...
  mathClass.define("acosh", toNativeFunction(env, acosh), "Math.acosh");
  mathClass.define("asinh", toNativeFunction(env, asinh), "Math.asinh");
  mathClass.define("atanh", toNativeFunction(env, atanh), "Math.atanh");
  mathClass.define("cbrt", toNativeFunction(env, cbrt), "Math.cbrt");
  mathClass.define("clz32", toNativeFunction(env, clz32), "Math.clz32");
  mathClass.define("cosh", toNativeFunction(env, cosh), "Math.cosh");
  mathClass.define("expm1", toNativeFunction(env, expm1), "Math.expm1");
  mathClass.define("fround", toNativeFunction(env, fround), "Math.fround");
  mathClass.define("hypot", toNativeFunction(env, hypot), "Math.hypot");
  mathClass.define("imul", toNativeFunction(env, imul), "Math.imul");
  mathClass.define("log10", toNativeFunction(env, log10), "Math.log10");
  mathClass.define("log2", toNativeFunction(env, log2), "Math.log2");
  mathClass.define("log1p", toNativeFunction(env, log1p), "Math.log1p");
  mathClass.define("sign", toNativeFunction(env, sign), "Math.sign");
  mathClass.define("sinh", toNativeFunction(env, sinh), "Math.sinh");
  mathClass.define("tanh", toNativeFunction(env, tanh), "Math.tanh");
  mathClass.define("trunc", toNativeFunction(env, trunc), "Math.trunc");
}
