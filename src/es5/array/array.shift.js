import { toLength } from "../../utils/native";
import { UNDEFINED } from "../../types/primitive-type";

export default function ($target, env, factory) {
  $target.define("shift", factory.createBuiltInFunction(function* () {
    let obj = UNDEFINED;
    let length = yield toLength(this.object);
    
    if (length > 0) {
      obj = this.object.getValue(0) || obj;
      
      let i = 1;
      while (i < length) {
        if (this.object.has(i)) {
          this.object.setValue(i - 1, this.object.getValue(i));
        } else {
          this.object.deleteProperty(i - 1);
        }
        
        i++;
      }

      this.object.deleteProperty(length - 1);
    }

    this.object.setValue("length", factory.createPrimitive(length === 0 ? 0 : --length));
    return obj;
  }, 0, "Array.prototype.shift"));
}
