import {ObjectType} from "./object-type";

export function CollectionType (className) {
  ObjectType.call(this);
  
  this.className = className;
  this.data = [];
}

CollectionType.prototype = Object.create(ObjectType.prototype);
CollectionType.prototype.constructor = CollectionType;
