import {ObjectType} from "./object-type";

export class ErrorType extends ObjectType {
	constructor (source) {
		super();
		this.source = source;
		this.className = "Error";
	}

	toNative () {
		return this.source;
	}
}
