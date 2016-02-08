import { defineThis } from "./function-helpers";

export default function ($target, env, factory) {
  $target.define("call", factory.createBuiltInFunction(function* (thisArg, ...args) {
    thisArg = defineThis(env, this.object, thisArg);
    this.object.bindThis(thisArg);

    return yield* this.object.call(thisArg, args);
  }, 1, "Function.prototype.call"));
}