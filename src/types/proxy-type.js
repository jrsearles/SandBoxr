import {inherits} from "util";
import {ObjectType} from "./object-type";
import {UNDEFINED} from "./primitive-type";
import {isUndefined, isObject, isNull} from "../utils/checks";
import {assertIsFunction} from "../utils/contracts";
import {exhaust as x} from "../utils/async";
import {toBoolean, toArray} from "../utils/native";
import {PropertyDescriptor} from "./property-descriptor";

const envSymbol = Symbol.for("env");

function getProxyMethod (proxy, key) {
  let handler = proxy.handler.getProperty(key);
  if (!handler) {
    return null;
  }

  let method = handler.getValue();
  if (isUndefined(method)) {
    return null;
  }

  assertIsFunction(method, key);
  return method;
}

function getValueOrDefault (obj, key, defaultValue = UNDEFINED, transformer = v => v) {
  let propInfo = obj.getProperty(key);
  if (propInfo) {
    return transformer(propInfo.getValue());
  }

  return defaultValue;
}

function normalizeKey (env, key) {
  if (typeof key !== "object") {
    return env.objectFactory.createPrimitive(String(key));
  }

  return key;
}

function denormalizeKey (key) {
  if (key.isSymbol) {
    return key;
  }

  return key.toNative();
}

function toPropertyDescriptor (env, descriptor) {
  let result = env.objectFactory.createObject();
  if (descriptor.get || descriptor.set) {
    result.setValue("get", descriptor.get || UNDEFINED);
    result.setValue("set", descriptor.set || UNDEFINED);
  } else {
    result.setValue("value", descriptor.value);
    result.setValue("writable", env.objectFactory.createPrimitive(descriptor.writable));
  }

  result.setValue("enumerable", env.objectFactory.createPrimitive(descriptor.enumerable));
  result.setValue("configurable", env.objectFactory.createPrimitive(descriptor.configurable));
  return result;
}

function toCall (proxy, methodName) {
  let proxyMethod = getProxyMethod(proxy, "apply");
  if (isUndefined(proxyMethod)) {
    return proxy.target.getValue(methodName);
  }

  return proxy[envSymbol].objectFactory.createBuiltInFunction(function* (thisArg, ...args) {
    if (methodName === "apply" && args.length > 0) {
      args = toArray(args[0]);
    }

    return yield proxy.call(thisArg, args);
  }, 1, `Function.prototype.${methodName}`);
}

function assertIsNotRevoked (proxy, methodName) {
  if (proxy.revoked) {
    throw TypeError(`Method ${methodName} called on a revoked Proxy object`);
  }
}

function throwProxyInvariantError (methodName) {
  throw TypeError(`Invariant check failed for proxy ${methodName} trap`);
}

export function ProxyType (target, handler) {
  ObjectType.call(this);
  
  this.target = target;
  this.handler = handler;
  this.className = target.className;
  this.type = target.type;
  this.revoked = false;
  this.isProxy = true;
}

inherits(ProxyType, ObjectType);

ProxyType.prototype.call = function* (thisArg, args) {
  assertIsNotRevoked(this, "apply");

  let proxyMethod = getProxyMethod(this, "apply");
  if (isUndefined(proxyMethod)) {
    return yield this.target.call(...arguments);
  }

  let argsArray = this[envSymbol].objectFactory.createArray(args);
  return yield proxyMethod.call(this.handler, [this.target, thisArg, argsArray]);
};

ProxyType.prototype.construct = function* (thisArg, args) {
  assertIsNotRevoked(this, "construct");

  let proxyMethod = getProxyMethod(this, "construct");
  if (isUndefined(proxyMethod)) {
    return yield this.target.construct(...arguments);
  }

  let argsArray = this[envSymbol].objectFactory.createArray(args);
  let newObj = yield proxyMethod.call(this.handler, [this.target, argsArray, this]);
  if (!isObject(newObj)) {
    throwProxyInvariantError("construct");
  }

  return newObj;
};

ProxyType.prototype.has = function (key) {
  assertIsNotRevoked(this, "has");

  let proxyMethod = getProxyMethod(this, "has");
  if (!proxyMethod) {
    return this.target.has(key);
  }

  let env = this[envSymbol];
  let result = toBoolean(x(proxyMethod.call(this.handler, [this.target, normalizeKey(env, key)])));
  if (!result) {
    let propInfo = this.target.getProperty(key);
    if (propInfo) {
      if (!propInfo.configurable) {
        throwProxyInvariantError("has");
      }

      if (!this.target.isExtensible()) {
        throwProxyInvariantError("has");
      }
    }
  }

  return result;
};

ProxyType.prototype.owns = function (key) {
  return !!this.getOwnProperty(key);
};

ProxyType.prototype.getProperty = function (key, target) {
  assertIsNotRevoked(this, "get");

  // special case for function types
  if (this.type === "function" && (key === "call" || key === "apply")) {
    return new PropertyDescriptor(this, {value: toCall(this, key)}, key);
  }

  let proxyMethod = getProxyMethod(this, "get");
  if (!proxyMethod) {
    return this.target.getProperty(key, target);
  }

  let env = this[envSymbol];
  let value = x(proxyMethod.call(this.handler, [this.target, normalizeKey(env, key), target || this]));
  let propInfo = this.target.getProperty(key);
  if (propInfo && !propInfo.configurable) {
    let targetValue = propInfo.getValue();
    if (propInfo.dataProperty && !propInfo.writable && !env.ops.areSame(value, targetValue)) {
      throwProxyInvariantError("get");
    }

    if (!propInfo.dataProperty && isUndefined(propInfo.get) && !isUndefined(value)) {
      throwProxyInvariantError("get");
    }
  }

  return new PropertyDescriptor(this, {value}, key);
};

ProxyType.prototype.getOwnProperty = function (key) {
  assertIsNotRevoked(this, "getOwnPropertyDescriptor");

  let proxyMethod = getProxyMethod(this, "getOwnPropertyDescriptor");
  if (!proxyMethod) {
    return this.target.getOwnProperty(key);
  }

  let env = this[envSymbol];
  let descriptor = x(proxyMethod.call(this.handler, [this.target, normalizeKey(env, key)]));
  if (descriptor.type !== "object" && descriptor.type !== "undefined") {
    throwProxyInvariantError("getOwnPropertyDescriptor");
  }

  let propInfo = this.target.getOwnProperty(key);
  let hasDescriptor = !!propInfo;
  let frozen = !this.target.isExtensible() || (hasDescriptor && !propInfo.configurable);

  if (isUndefined(descriptor)) {
    if (frozen) {
      throwProxyInvariantError("getOwnPropertyDescriptor");
    }

    return undefined;
  }

  if (!hasDescriptor && frozen) {
    throwProxyInvariantError("getOwnPropertyDescriptor");
  }

  let enumerable = getValueOrDefault(descriptor, "enumerable", false, toBoolean);
  let configurable = getValueOrDefault(descriptor, "configurable", false, toBoolean);
  let writable = getValueOrDefault(descriptor, "writable", false, toBoolean);
  let value = getValueOrDefault(descriptor, "value");
  let getter = getValueOrDefault(descriptor, "get", null);
  let setter = getValueOrDefault(descriptor, "set", null);

  if (!configurable && (!hasDescriptor || !frozen)) {
    throwProxyInvariantError("getOwnPropertyDescriptor");
  }

  let proxyDescriptor;
  if (getter || setter) {
    proxyDescriptor = {getter, setter, get: undefined, set: undefined, enumerable, configurable};
  } else {
    proxyDescriptor = {value, enumerable, configurable, writable};
  }

  if (hasDescriptor && !propInfo.canUpdate(proxyDescriptor)) {
    throwProxyInvariantError("getOwnPropertyDescriptor");
  }

  return new PropertyDescriptor(this, proxyDescriptor, key);
};

ProxyType.prototype.getPrototype = function () {
  assertIsNotRevoked(this, "getPrototypeOf");

  let proxyMethod = getProxyMethod(this, "getPrototypeOf");
  if (!proxyMethod) {
    return this.target.getPrototype();
  }

  let proto = x(proxyMethod.call(this.handler, [this.target]));
  if (!isObject(proto) && !isNull(proto)) {
    throwProxyInvariantError("getPrototypeOf");
  }

  if (this.target.isExtensible()) {
    return proto;
  }

  let targetProto = this.target.getPrototype();
  if (targetProto !== proto) {
    throwProxyInvariantError("getPrototypeOf");
  }

  return proto;
};

ProxyType.prototype.setPrototype = function (proto) {
  assertIsNotRevoked(this, "setPrototypeOf");

  let proxyMethod = getProxyMethod(this, "setPrototypeOf");
  if (!proxyMethod) {
    return this.target.setPrototype(proto);
  }

  let result = toBoolean(x(proxyMethod.call(this.handler, [this.target, proto])));
  if (this.target.isExtensible()) {
    return result;
  }

  let targetProto = this.target.getPrototype();
  if (result && targetProto !== proto) {
    throwProxyInvariantError("setPrototypeOf");
  }

  return result;
};

ProxyType.prototype.isExtensible = function () {
  assertIsNotRevoked(this, "isExtensible");

  let proxyMethod = getProxyMethod(this, "isExtensible");
  if (!proxyMethod) {
    return this.target.isExtensible();
  }

  let result = toBoolean(x(proxyMethod.call(this.handler, [this.target])));
  let targetResult = this.target.isExtensible();

  if (result !== targetResult) {
    throwProxyInvariantError("isExtensible");
  }

  return result;
};

ProxyType.prototype.preventExtensions = function () {
  assertIsNotRevoked(this, "preventExtensions");

  let proxyMethod = getProxyMethod(this, "preventExtensions");
  if (!proxyMethod) {
    return this.target.preventExtensions();
  }

  let result = toBoolean(x(proxyMethod.call(this.handler, [this.target])));
  if (result && this.target.isExtensible()) {
    throwProxyInvariantError("preventExtensions");
  }

  return result;
};

ProxyType.prototype.deleteProperty = function (key, throwOnError) {
  assertIsNotRevoked(this, "deleteProperty");

  let proxyMethod = getProxyMethod(this, "deleteProperty");
  if (isUndefined(proxyMethod)) {
    return this.target.deleteProperty(key, throwOnError);
  }

  let env = this[envSymbol];
  let result = toBoolean(x(proxyMethod.call(this.handler, [this.target, normalizeKey(env, key)])));
  if (result) {
    let propInfo = this.target.getProperty(key);
    if (propInfo && !propInfo.configurable) {
      throwProxyInvariantError("deleteProperty");
    }
  }

  return result;
};

ProxyType.prototype.defineProperty = function (key, descriptor, throwOnError) {
  assertIsNotRevoked(this, "defineProperty");

  let proxyMethod = getProxyMethod(this, "defineProperty");
  if (isUndefined(proxyMethod)) {
    return this.target.defineProperty(...arguments);
  }

  let env = this[envSymbol];
  let desc = toPropertyDescriptor(env, descriptor);
  let result = toBoolean(x(proxyMethod.call(this.handler, [this.target, normalizeKey(env, key), desc])));

  if (result) {
    let propInfo = this.target.getProperty(key);
    if (propInfo) {
      if ("configurable" in descriptor && descriptor.configurable !== propInfo.configurable) {
        throwProxyInvariantError("defineProperty");
      }

      if (!propInfo.canUpdate(descriptor)) {
        throwProxyInvariantError("defineProperty");
      }
    }  else if (!this.target.isExtensible() || descriptor.configurable === false) {
      throwProxyInvariantError("defineProperty");
    }
  }

  return result;
};

ProxyType.prototype.getOwnPropertyKeys = function (keyType) {
  assertIsNotRevoked(this, "ownKeys");

  let proxyMethod = getProxyMethod(this, "ownKeys");
  if (isUndefined(proxyMethod)) {
    return this.target.getOwnPropertyKeys(keyType);
  }

  let proxyKeys = x(toArray(x(proxyMethod.call(this.handler, [this.target]))));
  let rawKeys = proxyKeys.map(denormalizeKey);
  let targetKeys = this.target.getOwnPropertyKeys();

  if (!this.target.isExtensible()) {
    if (rawKeys.length !== targetKeys.length) {
      throwProxyInvariantError("ownKeys");
    }

    if (targetKeys.some(k => rawKeys.indexOf(k) === -1)) {
      throwProxyInvariantError("ownKeys");
    }
  } else {
    let fixedKeys = targetKeys.filter(k => !this.target.getProperty(k).configurable);
    if (fixedKeys.length > 0) {
      if (fixedKeys.some(k => rawKeys.indexOf(k) === -1)) {
        throwProxyInvariantError("ownKeys");
      }
    }
  }

  return rawKeys;
};

ProxyType.prototype.getIterator = function () {
  assertIsNotRevoked(this, "enumerate");

  let proxyMethod = getProxyMethod(this, "enumerate");
  if (isUndefined(proxyMethod)) {
    return this.target.getIterator();
  }

  let result = x(proxyMethod.call(this.handler, [this.target]));
  if (!isObject(result)) {
    throwProxyInvariantError("enumerate");
  }

  return result;
};

ProxyType.prototype.setValue = function (key, value) {
  assertIsNotRevoked(this, "set");

  let proxyMethod = getProxyMethod(this, "set");
  if (isUndefined(proxyMethod)) {
    return this.target.setValue(...arguments);
  }

  let env = this[envSymbol];
  let args = [this.target, normalizeKey(env, key), value, this];
  let result = toBoolean(x(proxyMethod.call(this.handler, args)));
  if (result) {
    let propInfo = this.target.getProperty(key);
    if (propInfo && !propInfo.configurable) {
      let targetValue = propInfo.getValue();
      if (propInfo.dataProperty && !propInfo.writable && !env.ops.areSame(value, targetValue)) {
        throwProxyInvariantError("set");
      }

      if (!propInfo.dataProperty && isUndefined(propInfo.set)) {
        throwProxyInvariantError("set");
      }
    }
  }

  return result;
};

ProxyType.prototype.revoke = function () {
  this.revoked = true;
};
