import {inherits} from "util";
import {ObjectType} from "./object-type";

const GLOBAL_SYMBOL_REGISTRY = Object.create(null);
let uid = 0;

export function SymbolType (description) {
  ObjectType.call(this);
  
  this.type = "symbol";
  this.className = "Symbol";
  this.description = description;
  this.uid = uid++;

  // add so we can easily check if an object is a symbol when we care
  this.isSymbol = true;
}

inherits(SymbolType, ObjectType);

SymbolType.prototype.defineProperty = function (key, descriptor) {
  return false;
};

SymbolType.prototype.setValue = function (key, value, target) {
  return false;
};

SymbolType.prototype.toNative = function () {
  return `Symbol(${this.description})`;
};

SymbolType.prototype.toString = function () {
  // this method is here so symbols can be coerced into strings for property lookups
  return `@@${this.uid}`;
};

SymbolType.prototype.toSymbolString = function () {
  return this.description ? `[${this.description}]` : "";
};

SymbolType.add = function (key, sym) {
  GLOBAL_SYMBOL_REGISTRY[key] = sym;
};

SymbolType.getByKey = function (key) {
  return GLOBAL_SYMBOL_REGISTRY[key];
};

SymbolType.getByInstance = function (sym) {
  for (let key in GLOBAL_SYMBOL_REGISTRY) {
    if (sym === GLOBAL_SYMBOL_REGISTRY[key]) {
      return GLOBAL_SYMBOL_REGISTRY[key];
    }
  }

  return undefined;
};
