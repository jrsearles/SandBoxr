import ObjectType from "./object-type";

export default class ErrorType extends ObjectType {
	constructor (source) {
		super();
		this.source = source;
		this.className = "Error";
	}
}
