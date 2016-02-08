import { toString } from "../../utils/native";
import { isNullOrUndefined } from "../../utils/checks";

import $toString from "./error.to-string";

const errorTypes = ["TypeError", "ReferenceError", "SyntaxError", "RangeError", "URIError", "EvalError"];

export default function errorApi (env) {
  const { global: globalObject, objectFactory } = env;

  let proto = objectFactory.createObject();
  proto.className = "Error";
  proto.define("name", objectFactory.createPrimitive("Error"));
  proto.define("message", objectFactory.createPrimitive(""));

  let errorClass = objectFactory.createFunction(function* (message) {
    let messageString;
    if (!isNullOrUndefined(message)) {
      messageString = yield toString(message);
    }

    return objectFactory.create("Error", new Error(messageString));
  }, proto, { configurable: false, enumerable: false, writable: false, name: "Error" });

  $toString(proto, env, objectFactory);
  globalObject.define("Error", errorClass);

  errorTypes.forEach(errorType => {
    let typeProto = objectFactory.createObject();
    typeProto.define("name", objectFactory.createPrimitive(errorType));

    // add to prototype chain to represent inheritance
    typeProto.setPrototype(proto);

    let errClass = objectFactory.createFunction(function* (message) {
      let messageString = yield toString(message);
      let nativeError = new global[errorType](messageString);
      return objectFactory.create(errorType, nativeError);
    }, typeProto, { configurable: false, enumerable: false, writable: false, name: errorType });

    globalObject.define(errorType, errClass);
  });
}
