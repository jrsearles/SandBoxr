import {ObjectType} from "./object-type";

export class IteratorType extends ObjectType {
	constructor (iterable, kind = "key+value") {
		super();

		this.iterable = iterable;
		this.position = 0;
		this.className = "Iterator";
		this.kind = kind;
	}

	advance () {
		return this.iterable.next();
	}
}
