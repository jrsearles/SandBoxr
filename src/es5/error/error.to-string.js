import {toString} from "../../utils/native";
import {isUndefined} from "../../utils/checks";

export default function ($target, env, factory) {
  $target.define("toString", factory.createBuiltInFunction(function* () {
    let nameValue = this.object.getValue("name");
    let name = isUndefined(nameValue) ? "Error" : yield toString(nameValue);
    
    let messageValue = this.object.getValue("message");
    let message = isUndefined(messageValue) ? "" : yield toString(messageValue);
    
    if (name && message) {
      return factory.createPrimitive(`${name}: ${message}`);
    }

    return factory.createPrimitive(name || message);
  }, 0, "Error.prototype.toString"));
}
