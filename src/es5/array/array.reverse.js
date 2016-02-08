import {toLength} from "../../utils/native";

export default function ($target, env, factory) {
  $target.define("reverse", factory.createBuiltInFunction(function* () {
    let length = yield toLength(this.object);
    let middle = Math.floor(length / 2);
    let lower = 0;
    let upper, upperValue, lowerValue;

    while (lower !== middle) {
      upper = length - lower - 1;
      lowerValue = this.object.has(lower) && this.object.getValue(lower);
      upperValue = this.object.has(upper) && this.object.getValue(upper);

      if (upperValue) {
        this.object.setValue(lower, upperValue);
      }

      if (lowerValue) {
        this.object.setValue(upper, lowerValue);
      }

      if (upperValue && !lowerValue) {
        this.object.deleteProperty(upper);
      } else if (lowerValue && !upperValue) {
        this.object.deleteProperty(lower);
      }

      lower++;
    }

    return this.object;
  }, 0, "Array.prototype.reverse"));

}