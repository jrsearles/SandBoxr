import StringIterator from "./string-iterator";
import SparseIterator from "./sparse-iterator";
import ArrayIterator from "./array-iterator";
import IterableIterator from "./iterable-iterator";
import {SymbolType} from "../types/symbol-type";
import {toLength} from "../utils/native";
import {exhaust as x} from "../utils/async";
import {isNullOrUndefined} from "../utils/checks";

const SPARE_ARRAY_DENSITY = 0.8;

function arrayIsSparse (arr, length) {
  let ownPropertyCount = Object.keys(arr.properties).length;

  // this is just to roughly estimate how dense the array is
  let density = (ownPropertyCount - 1) / length;
  return density < SPARE_ARRAY_DENSITY;
}

const iterate = {
  getIterator (obj) {
    let iteratorKey = SymbolType.getByKey("iterator");
    let iterator = obj.getProperty(iteratorKey);
    let fn = iterator && iterator.getValue();
    
    if (!isNullOrUndefined(fn)) {
      let it = x(fn.call(obj));
      return IterableIterator.create(it);
    }

    let length = x(toLength(obj));
    return this.forward(obj, 0, length);
  },

  forward (obj, lo, hi) {
    // string will never be dense
    if (obj.className === "String") {
      return StringIterator.create(obj, lo);
    }

    if (obj.className !== "Array" || arrayIsSparse(obj, hi)) {
      return SparseIterator.create(obj, lo, hi - 1);
    }

    return ArrayIterator.create(obj, lo, hi);
  },

  reverse (obj, hi, lo = 0) {
    if (obj.className === "String") {
      return StringIterator.create(obj, hi, true);
    }

    if (obj.className !== "Array" || arrayIsSparse(obj, hi)) {
      return SparseIterator.create(obj, lo, hi, true);
    }

    return ArrayIterator.create(obj, lo, hi, true);
  }
};

export default iterate;
