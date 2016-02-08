import { codePointAt } from "core-js/library/fn/string/virtual";
import { UNDEFINED } from "../types/primitive-type";
import { toInteger, toString } from "../utils/native";
import { assertIsNotNullOrUndefined } from "../utils/contracts";

export default function (target, env, factory) {
  target.define("codePointAt", factory.createBuiltInFunction(function* (pos) {
    assertIsNotNullOrUndefined(this.object, "String.prototype.codePointAt");
    let stringValue = yield toString(this.object);
    let position = yield toInteger(pos);

    if (position < 0 || position >= stringValue.length) {
      return UNDEFINED;
    }

    return factory.createPrimitive(codePointAt.call(stringValue, position));
  }, 1, "String.prototype.codePointAt"));
}