import { assertIsNotNullOrUndefined } from "../utils/contracts";
import { isUndefined } from "../utils/checks";
import { toString } from "../utils/native";

export default function (target, env, factory) {
  target.define("normalize", factory.createBuiltInFunction(function* (form) {
    assertIsNotNullOrUndefined(this.object, "String.prototype.normalize");
    let stringValue = yield toString(this.object);

    let formValue = "NFC";
    if (!isUndefined(form)) {
      // valid forms
      formValue = yield toString(form);

      if (!(/^NFK?(?:C|D)$/).test(formValue)) {
        throw RangeError("Supported forms are NFC, NFD, NFKC, or NFKD");
      }
    }

    return factory.createPrimitive(stringValue.normalize(formValue));
  }, 0, "String.prototype.normalize"));
}