import { defineThis } from "./function-helpers";
import { toString, toInteger } from "../../utils/native";
import { isUndefined } from "../../utils/checks";

export default function ($target, env, factory) {
  $target.define("bind", factory.createBuiltInFunction(function* (thisArg, ...args) {
    let fn = this.object;
    let length = 0;
    
    if (fn.owns("length")) {
      let lengthValue = fn.getValue("length");
      if (lengthValue && lengthValue.type === "number") {
        length = yield toInteger(lengthValue);
        length = Math.max(length - args.length, 0);
      }
    }
    
    thisArg = defineThis(env, fn, thisArg);

    let nativeFunc = function* (...additionalArgs) {
      let mergedArgs = args.concat(additionalArgs);
      return yield* fn[this.isNew ? "construct" : "call"](thisArg, mergedArgs);
    };

    nativeFunc.nativeLength = length;
    nativeFunc.strict = env.isStrict() || (fn.node && fn.node.body.isStrict());

    let nameValue = fn.getValue("name");
    let name = isUndefined(nameValue) ? "" : yield toString(nameValue);

    let boundFunc = factory.createFunction(nativeFunc, null, { name: `bound ${name}` });
    boundFunc.canConstruct = fn.canConstruct;
    boundFunc.bindScope(this.env.current);
    boundFunc.bindThis(thisArg);
    boundFunc.setPrototype(fn.getPrototype());
    
    if (!nativeFunc.strict) {
      boundFunc.remove("caller");
      boundFunc.remove("arguments");

      // these will be added in strict mode, but should always be here for bound functions
      let thrower = factory.createThrower("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them");
      boundFunc.defineProperty("caller", thrower);
      boundFunc.defineProperty("arguments", thrower);
    }

    return boundFunc;
  }, 1, "Function.prototype.bind"));
}
