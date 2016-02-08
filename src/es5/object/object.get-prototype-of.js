import {toObject} from "../../utils/native";
import {NULL} from "../../types/primitive-type";
import {confirmObject} from "./object-helpers";

export default function ($target, env, factory) {
  $target.define("getPrototypeOf", factory.createBuiltInFunction(function (obj) {
    if (!confirmObject(obj, "Object.getPrototypeOf", env.ecmaVersion)) {
      obj = toObject(obj, true);
    }

    let objProto = obj.getPrototype();
    return objProto || NULL;
  }, 1, "Object.getPrototypeOf"));
}
