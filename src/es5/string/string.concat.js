import { toString } from "../../utils/native";
import { assertIsNotNullOrUndefined } from "../../utils/contracts";
import { map } from "../../utils/async";

export default function ($target, env, factory) {
  $target.define("concat", factory.createBuiltInFunction(function* (...args) {
    assertIsNotNullOrUndefined(this.object, "String.prototype.concat");

    let stringValue = yield toString(this.object);
    let values = [stringValue];
    values = values.concat(yield map(args, function* (arg) { return yield toString(arg); }));
    return factory.create("String", values.join(""));
  }, 1, "String.prototype.concat"));
}
