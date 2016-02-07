import {inherits} from "util";
import {ObjectType} from "./object-type";

export function ErrorType (source) {
	ObjectType.call(this);
  
  this.source = source;
  this.className = "Error";
}

inherits(ErrorType, ObjectType);

ErrorType.prototype.toNative = function () {
  return this.source;
};
