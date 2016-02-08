import { ObjectType } from "../../types/object-type";

import $create from "./object.create";
import $defineProperties from "./object.define-properties";
import $defineProperty from "./object.define-property";
import $freeze from "./object.freeze";
import $getOwnPropertyDescriptor from "./object.get-own-property-descriptor";
import $getOwnPropertyNames from "./object.get-own-property-names";
import $getPrototypeOf from "./object.get-prototype-of";
import $isExtensible from "./object.is-extensible";
import $isFrozen from "./object.is-frozen";
import $isSealed from "./object.is-sealed";
import $keys from "./object.keys";
import $preventExtensions from "./object.prevent-extensions";
import $seal from "./object.seal";

import $hasOwnProperty from "./object.has-own-property";
import $isPrototypeOf from "./object.is-prototype-of";
import $propertyIsEnumerable from "./object.property-is-enumerable";
import $toString from "./object.to-string";
import $valueOf from "./object.value-of";

export default function objectApi (env) {
  const { global: globalObject, objectFactory } = env;

  let proto = new ObjectType();
  let objectClass = objectFactory.createFunction(function (value) {
    if (value) {
      if (value.isPrimitive) {
        if (value.value == null) {
          return objectFactory.createObject();
        }

        return value.toObject();
      }

      if (value.isSymbol) {
        // should return a new symbol instance
        let instance = objectFactory.create("Symbol", value.description);
        instance.type = "object";
        return instance;
      }

      // if an object is passed in just return
      return value;
    }

    return objectFactory.createObject();
  }, proto, { configurable: false, enumerable: false, writable: false, name: "Object" });

  $hasOwnProperty(proto, env, objectFactory);
  $isPrototypeOf(proto, env, objectFactory);
  $toString(proto, env, objectFactory);
  $valueOf(proto, env, objectFactory);

  $create(objectClass, env, objectFactory);
  $defineProperty(objectClass, env, objectFactory);
  $defineProperties(objectClass, env, objectFactory);
  $freeze(objectClass, env, objectFactory);
  $getOwnPropertyDescriptor(objectClass, env, objectFactory);
  $getOwnPropertyNames(objectClass, env, objectFactory);
  $getPrototypeOf(objectClass, env, objectFactory);
  $isExtensible(objectClass, env, objectFactory);
  $isFrozen(objectClass, env, objectFactory);
  $isSealed(objectClass, env, objectFactory);
  $keys(objectClass, env, objectFactory);
  $preventExtensions(objectClass, env, objectFactory);
  $propertyIsEnumerable(proto, env, objectFactory);
  $seal(objectClass, env, objectFactory);

  // function is an object - make sure that it is in the prototype chain
  globalObject.getValue("Function").getPrototype().setPrototype(proto);
  globalObject.define("Object", objectClass);
}
