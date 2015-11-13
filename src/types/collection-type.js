import {ObjectType} from "./object-type";

export class CollectionType extends ObjectType {
	constructor (className) {
		super();
		this.className = className;
		this.data = [];
	}
}