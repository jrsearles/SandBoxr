import {toLength, toInteger} from "../../utils/native";
import {createDataProperty} from "../../utils/helpers";

export default function ($target, env, factory) {
  $target.define("splice", factory.createBuiltInFunction(function* (start, deleteCount, ...elements) {
    let length = yield toLength(this.object);

    start = yield toInteger(start);
    if (start < 0) {
      start = Math.max(length + start, 0);
    } else {
      start = Math.min(start, length);
    }

    if (deleteCount) {
      deleteCount = yield toInteger(deleteCount);
      if (deleteCount < 0) {
        deleteCount = 0;
      } else {
        deleteCount = Math.min(Math.max(deleteCount, 0), length - start);
      }
    } else {
      deleteCount = length - start;
    }
    
    let removed = yield factory.createArrayFromSpecies(this.object, deleteCount);

    let k = 0;
    while (k < deleteCount) {
      if (this.object.has(k + start)) {
        createDataProperty(removed, k, this.object.getValue(k + start));
      }

      k++;
    }
    
    removed.setValue("length", factory.createPrimitive(k));

    let newCount = elements.length;
    if (newCount < deleteCount) {
      k = start;

      while (k < length - deleteCount) {
        if (this.object.has(k + deleteCount)) {
          this.object.setValue(k + newCount, this.object.getValue(k + deleteCount));
        } else {
          this.object.deleteProperty(k + newCount);
        }

        k++;
      }

      k = length;
      while (k > length - deleteCount + newCount) {
        this.object.deleteProperty(--k);
      }
    } else if (newCount > deleteCount) {
      k = length - deleteCount;
      while (k > start) {
        if (this.object.has(k + deleteCount - 1)) {
          this.object.setValue(k + newCount - 1, this.object.getValue(k + deleteCount - 1));
        } else {
          this.object.deleteProperty(k + newCount - 1);
        }

        k--;
      }
    }

    k = start;
    for (let i = 0; i < newCount; i++) {
      this.object.setValue(k, elements[i]);
      k++;
    }

    if (!this.object.setValue("length", factory.createPrimitive(length - deleteCount + newCount))) {
      throw TypeError("Unable to set length");
    }
    
    return removed;
  }, 2, "Array.prototype.splice"));
}
