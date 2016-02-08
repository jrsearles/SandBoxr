import {toString, toBoolean, toObject, toPropertyKey} from "../../utils/native";
import {isObject} from "../../utils/checks";
import {UNDEFINED} from "../../types/primitive-type";

function getOptions (obj) {
  return obj[Symbol.for("env")].options;
}

export function* defineProperty (env, obj, key, descriptor, throwOnError = true) {
  if (!isObject(descriptor)) {
    let stringValue = yield toString(descriptor);
    throw TypeError(`Property description must be an object: ${stringValue}`);
  }

  let options = Object.create(null);

  if (descriptor) {
    let hasValue = descriptor.has("value");
    let hasGetter = descriptor.has("get");
    let hasSetter = descriptor.has("set");

    if ((hasValue || descriptor.has("writable")) && (hasGetter || hasSetter)) {
      throw TypeError("Invalid property. A property cannot both have accessors and be writable or have a value");
    }

    ["writable", "enumerable", "configurable"].forEach(prop => {
      if (descriptor.has(prop)) {
        let attrValue = descriptor.getValue(prop);
        options[prop] = toBoolean(attrValue);
      }
    });

    let currentScope = env.current.scope;

    // we only keep a copy of the original getter/setter for use with `getOwnPropertyDescriptor`
    if (hasGetter) {
      let getter = descriptor.getValue("get") || UNDEFINED;
      if (getter.isPrimitive && getter.value === undefined) {
        options.get = options.getter = undefined;
      } else {
        if (getter.className !== "Function") {
          let stringValue = yield toString(getter);
          throw TypeError(`Getter must be a function: ${stringValue}`);
        }

        options.get = getter;
        options.getter = function* () {
          let scope = env.setScope(currentScope);
          let thisArg = getter.isStrict() ? this : toObject(this);

          return yield scope.use(function* () {
            return yield getter.call(thisArg) || UNDEFINED;
          });
        };
      }
    }

    if (hasSetter) {
      let setter = descriptor.getValue("set") || UNDEFINED;
      if (setter.isPrimitive && setter.value === undefined) {
        options.set = options.setter = undefined;
      } else {
        if (setter.className !== "Function") {
          let stringValue = yield toString(setter);
          throw TypeError(`Setter must be a function: ${stringValue}`);
        }

        options.set = setter;
        options.setter = function* (value) {
          let scope = env.setScope(currentScope);
          let thisArg = setter.isStrict() ? this : toObject(this);

          return yield scope.use(function* () {
            yield setter.call(thisArg, [value]);
            return UNDEFINED;
          });
        };
      }
    }

    if (hasValue) {
      options.value = descriptor.getValue("value") || UNDEFINED;
    }
  }

  return obj.defineProperty(key, options, throwOnError, env);
}

export function confirmObject (obj, methodName, ecmaVersion) {
  if (isObject(obj)) {
    return true;
  }

  if (ecmaVersion > 5) {
    return false;
  }

  throw TypeError(`${methodName} called on non-object`);
}

export function* getOwnPropertyDescriptor (env, target, propertyKey) {
  let key = yield toPropertyKey(propertyKey);
  let descriptor = target.getOwnProperty(key);

  if (descriptor) {
    let result = env.objectFactory.createObject();
    if (descriptor.dataProperty) {
      result.setValue("value", descriptor.value);
      result.setValue("writable", env.objectFactory.createPrimitive(descriptor.writable));
    } else {
      result.setValue("get", descriptor.get || UNDEFINED);
      result.setValue("set", descriptor.set || UNDEFINED);
    }

    result.setValue("enumerable", env.objectFactory.createPrimitive(descriptor.enumerable));
    result.setValue("configurable", env.objectFactory.createPrimitive(descriptor.configurable));
    return result;
  }

  return UNDEFINED;
}
