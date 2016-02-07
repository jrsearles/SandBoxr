import {inherits} from "util";
import {ObjectType} from "./object-type";

export function CollectionType (className) {
  ObjectType.call(this);
  
  this.className = className;
  this.data = [];
}

inherits(CollectionType, ObjectType);
