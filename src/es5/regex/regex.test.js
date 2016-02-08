import { toString, toInt32 } from "../../utils/native";

export default function ($target, env, factory) {
  $target.define("test", factory.createBuiltInFunction(function* (str) {
    let stringValue = yield toString(str);

    this.object.source.lastIndex = yield toInt32(this.object.getValue("lastIndex"));
    let testValue = this.object.source.test(stringValue);
    this.object.setValue("lastIndex", factory.createPrimitive(this.object.source.lastIndex));

    return factory.createPrimitive(testValue);
  }, 1, "RegExp.prototype.test"));
}
