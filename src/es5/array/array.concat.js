import {toObject, toLength} from "../../utils/native";
import {isSpreadable} from "./array-helpers";
import {createDataProperty} from "../../utils/helpers";

export default function ($target, env, factory) {
  $target.define("concat", factory.createBuiltInFunction(function* (...arrays) {
    let newArray = yield factory.createArrayFromSpecies(this.object, 0);
    
    // add "this" array to bunch
    arrays.unshift(toObject(this.object));

    let index = 0;
    while (arrays.length > 0) {
      let current = arrays.shift();

      if (isSpreadable(current)) {
        let length = yield toLength(current);
        for (let i = 0; i < length; i++) {
          if (current.has(i)) {
            let value = current.getValue(i);
            createDataProperty(newArray, index, value);
          }

          index++;
        }
      } else {
        createDataProperty(newArray, index++, current);
      }
    }

    newArray.setValue("length", factory.createPrimitive(index));
    return newArray;
  }, 1, "Array.prototype.concat"));
}