import $apply from "./reflect.apply";
import $construct from "./reflect.construct";
import $defineProperty from "./reflect.define-property";
import $deleteProperty from "./reflect.delete-property";
import $enumerate from "./reflect.enumerate";
import $get from "./reflect.get";
import $getOwnPropertyDescriptor from "./reflect.get-own-property-descriptor";
import $getPrototypeOf from "./reflect.get-prototype-of";
import $has from "./reflect.has";
import $isExtensible from "./reflect.is-extensible";
import $ownKeys from "./reflect.own-keys";
import $preventExtensions from "./reflect.prevent-extensions";
import $set from "./reflect.set";
import $setPrototypeOf from "./reflect.set-prototype-of";

export default function (globalObject, env, factory) {
  let reflectClass = factory.createObject();

  $apply(reflectClass, env, factory);
  $construct(reflectClass, env, factory);
  $defineProperty(reflectClass, env, factory);
  $deleteProperty(reflectClass, env, factory);
  $enumerate(reflectClass, env, factory);
  $get(reflectClass, env, factory);
  $getOwnPropertyDescriptor(reflectClass, env, factory);
  $getPrototypeOf(reflectClass, env, factory);
  $has(reflectClass, env, factory);
  $isExtensible(reflectClass, env, factory);
  $ownKeys(reflectClass, env, factory);
  $preventExtensions(reflectClass, env, factory);
  $set(reflectClass, env, factory);
  $setPrototypeOf(reflectClass, env, factory);

  globalObject.define("Reflect", reflectClass);
}
