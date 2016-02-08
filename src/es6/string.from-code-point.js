import {map} from "../utils/async";
import {toNumber} from "../utils/native";

export default function (target, env, factory) {
  target.define("fromCodePoint", factory.createBuiltInFunction(function* (...codePoints) {
    let args = yield map(codePoints, function* (cp) { return yield toNumber(cp); });
    return factory.createPrimitive(String.fromCodePoint(...args));
  }, 1, "String.fromCodePoint"));
}