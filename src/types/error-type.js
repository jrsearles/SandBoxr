import {ObjectType} from "./object-type";

export function ErrorType (source) {
	ObjectType.call(this);
  
  this.source = source;
  this.className = "Error";
}

ErrorType.prototype = Object.create(ObjectType.prototype);
ErrorType.prototype.constructor = ErrorType;

ErrorType.prototype.toNative = function () {
  return this.source;
};
