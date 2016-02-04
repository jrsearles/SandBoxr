import {ObjectType} from "./object-type";

export function RegexType (value) {
  ObjectType.call(this);
  
  this.source = value;
  this.className = "RegExp";
}

RegexType.prototype = Object.create(ObjectType.prototype);
RegexType.prototype.constructor = RegexType;

RegexType.prototype.init = function (env) {
  ObjectType.prototype.init.apply(this, arguments);

  // lastIndex is settable, all others are read-only attributes
  this.defineProperty("lastIndex", {value: env.objectFactory.createPrimitive(this.source.lastIndex), writable: true});

  ["source", "global", "ignoreCase", "multiline"].forEach(key => {
    if (env.ecmaVersion > 5) {
      let getter = function () { return env.objectFactory.createPrimitive(this.source[key]); };
      let getterFunc = env.objectFactory.createGetter(getter, key);

      this.defineProperty(key, {
        getter: getter,
        get: getterFunc,
        configurable: true
      });
    } else {
      this.defineProperty(key, {value: env.objectFactory.createPrimitive(this.source[key])});
    }
  });
};

RegexType.prototype.toNative = function () {
  return this.source;
};
